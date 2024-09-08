data "google_billing_account" "billing" {
  display_name = var.billing_name
  open         = true
}

resource "google_project" "my_project" {
  name            = var.project_name
  project_id      = var.project_id
  billing_account = data.google_billing_account.billing.id
}

resource "google_service_account" "custom_service_account" {
  account_id   = "my-account"
  display_name = "Custom Service Account"
}

resource "google_project_iam_member" "gae_api" {
  project = google_service_account.custom_service_account.project
  role    = "roles/compute.networkUser"
  member  = "serviceAccount:${google_service_account.custom_service_account.email}"
}

resource "google_compute_network" "vpc_network" {
  name                    = "${var.project_id}-network"
  auto_create_subnetworks = false
  mtu                     = 1460
}

resource "google_compute_subnetwork" "default" {
  name          = "${var.project_id}-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.gcp_region
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_firewall" "ssh-rule" {
  name = "allow-ssh"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports = ["22"]
  }
  allow {
    protocol = "icmp"
  }
  target_tags = ["ssh"]
  source_ranges = ["0.0.0.0/0"]
  direction = "INGRESS"
}

resource "google_compute_instance" "vm" {
  name         = "${var.project_id}-vm"
  machine_type = "e2-micro"
  tags         = ["ssh"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
      type  = "pd-standard"
      size  = 20
    }
  }

  metadata_startup_script = templatefile("${path.module}/startup.tpl", {
    account_id = var.cf_account_id,
    tunnel_id = cloudflare_tunnel.vm_tunnel.id,
    secret = random_id.argo_secret.b64_std,
    http_domain = "${cloudflare_record.vm_http.name}.${var.cf_domain}",
    ssh_domain = "${cloudflare_record.ssh.name}.${var.cf_domain}",
    wg_privkey = var.wg_privkey,
    wg_pubkey = var.wg_pubkey,
    wg_endpoint = var.wg_endpoint,
    wg_addr = var.wg_addr,
    wg_dns = var.wg_dns,
    wg_allowed_ips = var.wg_allowed_ips,
    wg_keepalive = var.wg_keepalive
  })

  network_interface {
    subnetwork = google_compute_subnetwork.default.id

    access_config {
      network_tier = "STANDARD"
    }
  }
}
