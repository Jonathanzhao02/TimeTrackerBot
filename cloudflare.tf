data "cloudflare_zone" "tld" {
  account_id = var.cf_account_id
  name = var.cf_domain
}

resource "random_id" "argo_secret" {
  byte_length = 36
}

resource "cloudflare_tunnel" "vm_tunnel" {
  account_id = var.cf_account_id
  name       = "zero_trust_gcp_vm"
  secret     = random_id.argo_secret.b64_std
  config_src = "local"
}

resource "cloudflare_record" "ssh" {
  zone_id = data.cloudflare_zone.tld.zone_id
  name    = "ssh"
  value   = "${cloudflare_tunnel.vm_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
  comment = "SSH from CF Tunnel"
}

resource "cloudflare_record" "root" {
  zone_id = data.cloudflare_zone.tld.zone_id
  name    = "@"
  value   = "1.1.1.1"
  type    = "A"
  proxied = false
  comment = "DDNS from VM"
}

resource "cloudflare_record" "wildcard" {
  zone_id = data.cloudflare_zone.tld.zone_id
  name    = "*"
  value   = "zhaonathan.com"
  type    = "CNAME"
  proxied = true
  comment = "Wildcard"
}
