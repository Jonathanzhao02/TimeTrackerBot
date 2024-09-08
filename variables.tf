variable "project_name" {
  description = "Display name for GCP project"
  type = string
}

variable "project_id" {
  description = "API name for GCP project"
  type = string
}

variable "billing_name" {
  description = "Name of billing account for GCP project"
  type = string
}

variable "gcp_region" {
  description = "Region for GCP project resources"
  type = string
  default = "us-central1"
}

variable "gcp_zone" {
  description = "Zone for GCP project resources"
  type = string
  default = "us-central1-c"
}

variable "cf_token" {
  description = "Cloudflare API token"
  type = string
}

variable "cf_zone_id" {
  description = "Zone ID for Cloudflare resources"
  type = string
}

variable "cf_account_id" {
  description = "Cloudflare account ID"
  type = string
}

variable "cf_domain" {
  description = "Cloudflare domain"
  type = string
}

variable "wg_privkey" {
  description = "Self private key for Wireguard"
  type = string
}

variable "wg_pubkey" {
  description = "Peer public key for Wireguard"
  type = string
}

variable "wg_endpoint" {
  description = "Peer endpoint for Wireguard"
  type = string
}

variable "wg_addr" {
  description = "Self address for Wireguard"
  type = string
}

variable "wg_dns" {
  description = "DNS server for Wireguard"
  type = string
}

variable "wg_allowed_ips" {
  description = "Allowed IPs for Wireguard"
  type = string
}

variable "wg_keepalive" {
  description = "Keepalive for Wireguard"
  type = number
}
