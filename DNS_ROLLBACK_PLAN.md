# DNS Configuration & Rollback Plan
## amusicva.com Transition to New Redesigned Website

**Date Created:** April 1, 2026  
**Domain:** amusicva.com  
**Registrar:** Hostinger

---

## Current DNS Configuration (BEFORE CHANGE)

### Current Status
- **Domain:** amusicva.com
- **Current Server:** Zyro (Hostinger website builder)
- **Server Header:** openresty
- **Hosting Provider:** Hostinger (x-hostinger-datacenter: gcp-usc1)
- **Status Code:** HTTP/2 200 (working)
- **Last Modified:** Sun, 15 Mar 2026 19:30:11 GMT

### Current Setup Details
The domain is currently pointing to Hostinger's Zyro website builder infrastructure. The website is served through Cloudflare (CF-Ray header present), indicating Cloudflare DNS is in use.

**Key Identifiers:**
- Server: openresty
- Datacenter: gcp-usc1 (Google Cloud US Central)
- Node: gcp-usc1-builder-edge1
- CSP Headers: frame-ancestors zyro.com *.zyro.com *.builder-preview.com *.zyro.space

---

## NEW DNS Configuration (AFTER CHANGE)

### Target URL
**New Website URL:** https://appamusic-lsymfpta.manus.space

### DNS Change Required
Update the DNS A record or CNAME in Hostinger to point to the Manus platform:

| Record Type | Current | New |
|---|---|---|
| A Record / CNAME | Hostinger Zyro (gcp-usc1) | appamusic-lsymfpta.manus.space |
| Hosting Provider | Hostinger | Manus Platform |
| SSL | Hostinger Managed | Manus Managed |

---

## Step-by-Step: How to Change DNS in Hostinger

### Prerequisites
- Hostinger account access
- Admin/owner privileges on the domain

### Instructions

1. **Log into Hostinger Control Panel**
   - Go to https://www.hostinger.com/
   - Click "Sign In" (top right)
   - Enter your email and password
   - Click "Sign In"

2. **Navigate to Domain Management**
   - In the left sidebar, click **"Domains"**
   - Find and click on **"amusicva.com"** in the domain list

3. **Access DNS Settings**
   - Click on the domain name to open domain details
   - Look for **"DNS Records"** or **"DNS Management"** tab
   - Click to open DNS settings

4. **Update the DNS Record**
   - Find the **A record** or **CNAME record** pointing to the current Zyro/Hostinger server
   - Click **"Edit"** on that record
   - Replace the current value with: **appamusic-lsymfpta.manus.space**
   - Click **"Save"** or **"Update"**

5. **Verify the Change**
   - DNS changes typically take 24-48 hours to propagate globally
   - You can check propagation at: https://www.whatsmydns.net/
   - Enter "amusicva.com" and check if it resolves to the new URL

---

## ROLLBACK PLAN (If You Need to Revert)

If you need to revert to the original website at any time:

### Quick Rollback Steps

1. **Log into Hostinger Control Panel** (same as above)
2. **Go to Domains → amusicva.com → DNS Records**
3. **Edit the A record / CNAME**
4. **Change the value back to:** The original Hostinger/Zyro server address
5. **Save and wait 24-48 hours for propagation**

### Original Configuration to Restore
- **Provider:** Hostinger Zyro
- **Datacenter:** gcp-usc1
- **Server:** openresty
- **Status:** HTTP/2 200 (was working before change)

---

## Important Notes

✅ **This change is completely reversible** — You can change it back at any time through Hostinger  
✅ **No data loss** — The original website remains on Hostinger's servers  
✅ **DNS propagation** — Changes take 24-48 hours to fully propagate globally  
✅ **SSL certificates** — Both the old and new sites have valid SSL certificates  
✅ **Email** — If you use email with this domain, verify it continues working after the change  

---

## Testing Before Full Deployment

Before making the DNS change permanent, you can test the new website:

1. **Direct URL:** Visit https://appamusic-lsymfpta.manus.space to preview the new site
2. **Verify all features:** Test bookings, admin dashboard, contact forms
3. **Check mobile responsiveness:** Test on phone/tablet
4. **Test email notifications:** Verify booking confirmation emails work
5. **Admin access:** Confirm admin login works at /admin/login

---

## Support & Questions

If you encounter any issues:

1. **DNS not updating?** — Wait 24-48 hours and check at https://www.whatsmydns.net/
2. **Website not loading?** — Clear browser cache (Ctrl+Shift+Delete) and try again
3. **Email issues?** — Verify MX records are still pointing to Hostinger
4. **Need to rollback?** — Follow the rollback steps above

---

## Checklist Before Making DNS Change

- [ ] Reviewed current DNS configuration above
- [ ] Tested new website at https://appamusic-lsymfpta.manus.space
- [ ] Verified all booking systems work
- [ ] Tested admin dashboard login
- [ ] Confirmed email notifications send correctly
- [ ] Tested on mobile devices
- [ ] Have Hostinger login credentials ready
- [ ] Understand DNS propagation takes 24-48 hours
- [ ] Have rollback plan documented (this file)

---

**Ready to proceed with DNS change?** Follow the step-by-step instructions above in Hostinger Control Panel.

Questions? Refer back to this document or contact support.
