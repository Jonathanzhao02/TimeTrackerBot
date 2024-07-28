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
