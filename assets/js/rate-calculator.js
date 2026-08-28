/**
 * MR.FIXERS INDIA PVT LTD - Interactive Rate Card & Estimator
 * Calculates visit charges and bundles services for quick booking
 */

document.addEventListener('DOMContentLoaded', () => {
  const calcContainer = document.querySelector('.calculator-card');
  if (!calcContainer) return;

  const checkboxes = calcContainer.querySelectorAll('.calc-checkbox');
  const breakdownList = document.getElementById('calcBreakdownList');
  const totalAmountEl = document.getElementById('calcTotalAmount');
  const discountNote = document.getElementById('calcDiscountNote');
  const proceedBtn = document.getElementById('calcProceedBtn');

  const servicesData = {
    ac: { name: 'AC Tech Service (Visit)', price: 799 },
    electrician: { name: 'Electrician Inspection', price: 499 },
    plumber: { name: 'Plumber Inspection', price: 499 },
    painting: { name: 'Painting & Civil Works', price: 0, isFree: true },
    facility: { name: 'Commercial FM Consultation', price: 0, isFree: true }
  };

  function updateCalculator() {
    let total = 0;
    let selectedServices = [];
    let breakdownHtml = '';

    checkboxes.forEach(cb => {
      const itemEl = cb.closest('.calc-item');
      const serviceKey = cb.getAttribute('data-service');
      const service = servicesData[serviceKey];

      if (cb.checked && service) {
        itemEl.classList.add('selected');
        total += service.price;
        selectedServices.push(service.name);

        const priceDisplay = service.isFree ? 'FREE' : `₹${service.price}`;
        breakdownHtml += `
          <div class="calc-breakdown-row">
            <span>${service.name}</span>
            <span><strong>${priceDisplay}</strong></span>
          </div>
        `;
      } else {
        itemEl.classList.remove('selected');
      }
    });

    if (selectedServices.length === 0) {
      breakdownList.innerHTML = '<div class="calc-breakdown-row" style="color: #94a3b8;">No services selected. Please choose from above.</div>';
      totalAmountEl.textContent = '₹0';
      if (proceedBtn) proceedBtn.classList.add('disabled');
      if (discountNote) discountNote.style.display = 'none';
      return;
    }

    breakdownList.innerHTML = breakdownHtml;
    totalAmountEl.textContent = `₹${total}`;
    if (proceedBtn) proceedBtn.classList.remove('disabled');
    if (discountNote) discountNote.style.display = 'block';

    // Store selected list for proceed button
    if (proceedBtn) {
      proceedBtn.onclick = () => {
        const queryServices = encodeURIComponent(selectedServices.join(', '));
        window.location.href = `enquiry.html?service=${queryServices}&est_cost=${total}`;
      };
    }
  }

  // Bind checkbox and row click events
  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateCalculator);

    const row = cb.closest('.calc-item');
    if (row) {
      row.addEventListener('click', (e) => {
        if (e.target !== cb) {
          cb.checked = !cb.checked;
          updateCalculator();
        }
      });
    }
  });

  // Initial calculation
  updateCalculator();
});
