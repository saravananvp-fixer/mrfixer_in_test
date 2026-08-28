/**
 * MR.FIXERS INDIA PVT LTD - Enquiry & Booking Form Handler
 * Dispatches inquiries to saravanan.vp@mrfixers.in & generates WhatsApp bookings
 */

document.addEventListener('DOMContentLoaded', () => {
  const enquiryForm = document.getElementById('mrfixersEnquiryForm');
  const serviceSelect = document.getElementById('service_select');
  const modalOverlay = document.getElementById('bookingSuccessModal');
  const modalRefNumber = document.getElementById('bookingRefNumber');
  const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

  // 1. Auto-fill from URL Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const preSelectedService = urlParams.get('service');
  const estCost = urlParams.get('est_cost');

  if (serviceSelect && preSelectedService) {
    // Check if matching option exists or add custom value
    let found = false;
    for (let opt of serviceSelect.options) {
      if (opt.value.toLowerCase().includes(preSelectedService.toLowerCase()) || 
          preSelectedService.toLowerCase().includes(opt.value.toLowerCase())) {
        serviceSelect.value = opt.value;
        found = true;
        break;
      }
    }
    if (!found) {
      const customOpt = new Option(preSelectedService, preSelectedService, true, true);
      serviceSelect.add(customOpt);
    }
  }

  if (estCost && document.getElementById('customer_notes')) {
    document.getElementById('customer_notes').value = `Selected bundle from Rate Estimator (Est. Visit Fee: ₹${estCost})`;
  }

  // 2. Form Submission Handling
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;

      // Basic field values
      const name = (document.getElementById('customer_name')?.value || '').trim();
      const phone = (document.getElementById('customer_phone')?.value || '').trim();
      const email = (document.getElementById('customer_email')?.value || '').trim();
      const service = document.getElementById('service_select')?.value || 'General Facility Enquiry';
      const propertyType = document.getElementById('property_type')?.value || 'Residential';
      const address = (document.getElementById('customer_address')?.value || '').trim();
      const prefDate = document.getElementById('preferred_date')?.value || 'As soon as possible';
      const prefTime = document.getElementById('preferred_time')?.value || 'Flexible';
      const notes = (document.getElementById('customer_notes')?.value || '').trim();

      // Validation
      if (!name || !phone) {
        alert('Please fill in your Name and Phone Number.');
        return;
      }

      // Generate a booking reference
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const bookingRef = `MFX-${new Date().getFullYear()}-${randomNum}`;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Enquiry...';

      // Prepare payload for FormSubmit to send email to saravanan.vp@mrfixers.in
      const formData = {
        _subject: `New Service Booking Request: [${bookingRef}] - ${name}`,
        _replyto: email || 'no-reply@mrfixers.in',
        _template: 'table',
        _captcha: 'false',
        _cc: 'sales@mrfixer.in',
        Booking_Reference: bookingRef,
        Customer_Name: name,
        Phone_Number: phone,
        Email_Address: email || 'Not provided',
        Requested_Service: service,
        Property_Type: propertyType,
        Address_Location: address || 'Trichy',
        Preferred_Date: prefDate,
        Preferred_Time_Slot: prefTime,
        Additional_Notes: notes || 'None'
      };

      try {
        // Send email to saravanan.vp@mrfixers.in via AJAX
        await fetch('https://formsubmit.co/ajax/saravanan.vp@mrfixers.in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } catch (err) {
        console.warn('FormSubmit AJAX notification sent with client fallback:', err);
      }

      // Show success modal
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;

      if (modalRefNumber) {
        modalRefNumber.textContent = bookingRef;
      }

      // Prepare WhatsApp Direct Message Link
      const waText = encodeURIComponent(
        `*New Service Enquiry - Mr.Fixers*\n` +
        `Ref: ${bookingRef}\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service} (${propertyType})\n` +
        `Location: ${address || 'Trichy'}\n` +
        `Preferred Time: ${prefDate} (${prefTime})\n` +
        `Notes: ${notes || 'Standard booking'}`
      );
      
      const whatsappUrl = `https://wa.me/917010180190?text=${waText}`;

      if (modalWhatsAppBtn) {
        modalWhatsAppBtn.href = whatsappUrl;
      }

      if (modalOverlay) {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      // Reset form
      enquiryForm.reset();
    });
  }
});
