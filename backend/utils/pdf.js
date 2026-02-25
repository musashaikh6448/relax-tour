import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

/* ================= THEME COLORS ================= */
const ORANGE = '#f97316';
const DARK = '#111827';
const GRAY = '#374151';

/* ================= CENTER WIDTH ================= */
const CONTENT_WIDTH = 400;

export const generateQuotationPdf = async (quotation, tour) => {
  const baseDir = path.join(process.cwd(), 'uploads/pdfs');
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

  const fileName = `quotation-${quotation._id}.pdf`;
  const filePath = path.join(baseDir, fileName);

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  const centerX = () => (doc.page.width - CONTENT_WIDTH) / 2;

  /* ================= HEADER ================= */
  const logoPath = path.join(process.cwd(), 'assets/logo.png');
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 30, { width: 90 });
  }

  doc.font('Helvetica-Bold')
    .fontSize(24)
    .fillColor(ORANGE)
    .text('Relax Tours & Travels', 160, 40);

  doc.font('Helvetica')
    .fontSize(11)
    .fillColor(GRAY)
    .text('Travel the World with Comfort & Trust', 190, 70);

  doc.moveTo(50, 95).lineTo(545, 95).lineWidth(2).stroke(ORANGE);
  doc.y = 120;

  /* ================= DESTINATION IMAGE ================= */
  if (tour?.image) {
    try {
      const res = await fetch(tour.image);
      const buffer = Buffer.from(await res.arrayBuffer());
      doc.image(buffer, centerX(), doc.y, { width: CONTENT_WIDTH });
      doc.y += 270;
    } catch {
      console.log('Image load failed');
    }
  }

  /* ================= GREETING ================= */
  ensureSpace(doc, 100);

  doc.font('Helvetica-Bold')
    .fontSize(14)
    .fillColor(DARK)
    .text(`Dear ${quotation.customerName},`, centerX(), doc.y, {
      width: CONTENT_WIDTH,
    });

  doc.moveDown(0.8);

  doc.font('Helvetica')
    .fontSize(11)
    .fillColor(GRAY)
    .text(
`Greetings from Relax Tours & Travels.

Our sales team has prepared the quotation for your upcoming journey.
Please review the details carefully and feel free to reach out for any modifications.`,
      centerX(),
      doc.y,
      { width: CONTENT_WIDTH }
    );

  doc.moveDown(2);
  /* ================= TRIP DETAILS ================= */
  section(doc, 'Trip Details');

  key(doc, 'Destination', quotation.destination);
  key(doc, 'Travel Date', quotation.travelDate);
  key(doc, 'Travellers', quotation.people);
  key(doc, 'Duration', tour?.duration || '-');
  key(doc, 'Package Price', `₹${quotation.budget}`);

  doc.moveDown(2);

  /* ================= DAY WISE ITINERARY ================= */
 /* ================= DAY WISE ITINERARY ================= */
doc.addPage();

  section(doc, 'Day Wise Itinerary');

  tour?.itinerary?.forEach(day => {
    ensureSpace(doc, 70);

    doc.font('Helvetica-Bold')
      .fontSize(14)
      .fillColor(ORANGE)
      .text(`Day ${day.day}: ${day.title}`, centerX(), doc.y, {
        width: CONTENT_WIDTH,
      });

    doc.moveDown(0.5);

    day.points?.forEach(p => {
      doc.font('Helvetica')
        .fontSize(11)
        .fillColor(DARK)
        .text(`• ${p}`, centerX(), doc.y, {
          width: CONTENT_WIDTH,
          indent: 18,
        });
      doc.moveDown(0.5);
    });

    doc.moveDown(1);
  });

  /* ================= INCLUDED / EXCLUDED ================= */
   section(doc, "What's Included");
  tour?.included?.forEach(item => bullet(doc, item));

  doc.moveDown(2);

  section(doc, "What's Excluded");
  tour?.excluded?.forEach(item => bullet(doc, item));

  doc.moveDown(2);

  /* ================= EXTRA INFO (SAME PAGE) ================= */
  section(doc, 'Important Information');
  staticImportant.forEach(p => bullet(doc, p));

  doc.moveDown(2);

  section(doc, 'Terms & Conditions');
  staticTerms.forEach(p => bullet(doc, p));

  doc.moveDown(2);

  /* ================= NEXT PAGE ================= */
   section(doc, 'Package Notes');
  staticPackageNotes.forEach(p => bullet(doc, p));

  doc.moveDown(2);

  section(doc, 'Payment Policy');
  staticPayment.forEach(p => bullet(doc, p));

  doc.moveDown(2);
  section(doc, 'Payment Policy');
  staticPaymentLink.forEach(p => bullet(doc, p));

  doc.moveDown(2);
  section(doc, 'Cancellation & Refund Policy');
  staticCancellation.forEach(p => bullet(doc, p));

  doc.moveDown(2);

  /* ================= FOOTER ================= */
  section(doc, 'Head Office');
  doc.fontSize(11).fillColor(DARK).text(
`Relax Tours & Travels, Trip Holidays India Private Limited
Address: near by Ananda Marga High School, HPSEBL Colony, Bhuntar, Sarabai, Himachal Pradesh
175125.
Himachal Pradesh, UP, Uttarakhand.

Contact Us: +91 9000000000 |
Service: +91 80916-60060, +91 96250-30224
Email: info@relaxtours.com. 
Thank you for consulting Zoyo Trip Holidays India Pvt. Ltd. for your trip! I hope the above detail is in order
and looking forward to hearing from you! Your early response would be highly appreciated. Have a great
day`
  );

  doc.end();
  return `uploads/pdfs/${fileName}`;
};

/* ================= HELPERS ================= */

const section = (doc, title) => {
  ensureSpace(doc, 90);
  const x = (doc.page.width - CONTENT_WIDTH) / 2;

  doc.font('Helvetica-Bold')
    .fontSize(18)
    .fillColor(DARK)
    .text(title, x, doc.y, {
      width: CONTENT_WIDTH,
      align: 'left',
    });

  doc.moveDown(0.4);
  doc.rect(x, doc.y, CONTENT_WIDTH, 3).fill(ORANGE);
  doc.moveDown(1.4);
};

const bullet = (doc, text) => {
  ensureSpace(doc, 40);
  const x = (doc.page.width - CONTENT_WIDTH) / 2;

  doc.font('Helvetica')
    .fontSize(11)
    .fillColor(DARK)
    .text(`• ${text}`, x, doc.y, {
      width: CONTENT_WIDTH,
      indent: 20,
      align: 'left',
    });

  doc.moveDown(0.8); // thoda airy look
};

const key = (doc, k, v) => {
  ensureSpace(doc, 28);
  const x = (doc.page.width - CONTENT_WIDTH) / 2;

  doc.font('Helvetica-Bold')
    .fontSize(12)
    .fillColor(DARK)
    .text(`${k}: `, x, doc.y, { continued: true });

  doc.font('Helvetica')
    .fontSize(12)
    .text(v, {
      width: CONTENT_WIDTH,
    });

  doc.moveDown(0.6);
};

const ensureSpace = (doc, spaceNeeded) => {
  if (doc.y + spaceNeeded > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
    doc.y = doc.page.margins.top;
  }
};

/* ================= STATIC CONTENT ================= */

const staticImportant = [
  'All travelers must carry valid government-issued photo identification.',
  'Hotel check-in and check-out timings are subject to hotel policies.',
  'Early check-in or late check-out is subject to availability.',
  'Travelling to places is an investment of lifetime memories',
  'EMI Option is also available to help you out.(Travel Now , Pay Later)'
];

const staticTerms = [
  'Check-in time is 12:00 Noon unless specified otherwise.',
  'Hotels are subject to availability at the time of confirmation.',
  'Company reserves the right to modify the itinerary due to operational reasons.',
  'Similar hotels will be given in case selected hotels are sold out/ under maintenance',
  'Free stay facilities for Children below 5 years in a parents room without extra bed , meals.',
  ' Above 5 years, child will be considered as an adult and will be charged accordingly.',
];

const staticPackageNotes = [
  'All packages are customizable as per guest preference.',
  'Booking is confirmed only after receipt of advance payment.',
  'Package will not be considered booked until advance amount have not been received',
  'Travel dates of DND (Date not decided) packages should be affirmed within 3 Months',
  'Delays may lead to certain inconveniences',
  
];

const staticPayment = [
  '50% advance payment is required to confirm the booking.',
  'Remaining balance to be cleared before journey commencement.',
  'You have to deposit/transfer INR 1,000 Per Person as an Advance token Money & Second Installement to confirm your booking on guaranteed basis.',

];

const staticPaymentLink = [
'To make online payment through our website, please click the link https://zoyotrip.in/payment.',
'You can choose any of our Payment gateways such as Razorpay, Google Pay, HDFC gateway, Paytm, PhonePe etc and pay via your Debit / Credit Card or NEFT (without adding beneficiary account).',
'Cash Deposit at Zoyo Trip Holidays India Private Limited office (Addresses at bottom)',
'Please visit the link https://zoyotrip.in/payment',
'You can also opt for our EMI options available in our gateways.',
'Please reffer to this Payment Link for payment instructions and all the payment methods.',
];

const staticCancellation = [
  'Advance amount is non-refundable.',
  'No refund will be provided in case of no-show or early departure.',
 
'Cancellations made 31 days or more prior to travel date will attract no cancellation charges ,however the amount received as token will be reusable by the customer within 365 days from the date when payment is received. Company will help with the credit note to reuse the amount.',

'No refunds will be given in case of missed or unused services. This includes Flights, Trains Hotel stays, meals, sightseeing, transfers, entry ticket, permits or any other Zoyo Trip Holidays India Private Limited services.',
'TCS & GST once collected cant be refunded or adjusted in any case of cancellation or modification. You can claim the amount as adjustment against income tax at the time of filing annual ITR. -Refund applicable after deducting the cancellation charges as per companys policy can only be.',
];