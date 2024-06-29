terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  project = "snowboy-discord"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_project" "my_project" {
  name            = "Snowboy Discord"
  project_id      = "snowboy-discord"
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
  name                    = "snowboy-network"
  auto_create_subnetworks = false
  mtu                     = 1460
}

resource "google_compute_subnetwork" "default" {
  name          = "snowboy-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = "us-central1"
  network       = google_compute_network.vpc_network.id
}

resource "google_compute_firewall" "ssh-rule" {
  name = "allow-ssh"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports = ["22"]
  }
  target_tags = ["ssh"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "http-rule" {
  name = "allow-http"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports = ["80"]
  }
  target_tags = ["http-server"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "https-rule" {
  name = "allow-https"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports = ["443"]
  }
  target_tags = ["https-server"]
  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_instance" "vm" {
  name         = "snowboy"
  machine_type = "e2-micro"
  tags         = ["ssh", "http-server", "https-server"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
      type  = "pd-standard"
      size  = 10
    }
  }

  metadata_startup_script = file("${path.module}/startup.sh")

  network_interface {
    subnetwork = google_compute_subnetwork.default.id

    access_config {
      network_tier = "STANDARD"
    }
  }
}

data "google_billing_account" "billing" {
  display_name = "Billing"
  open         = true
}
