terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.gcp_region
  zone    = var.gcp_zone
}

provider "cloudflare" {
  api_token = var.cf_token
}
