const BRAND_NAME = '폰가이즈';
const TEST_FOOTER = '테스트 환경';

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatAmount(amount, currency = 'KRW') {
  const formatted = Number(amount || 0).toLocaleString('ko-KR');
  return currency === 'KRW' ? `${formatted}원` : `${formatted} ${esc(currency)}`;
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

function formatDateTime(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function baseLayout({ icon, title, subtitle, body, footer }) {
  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:'Apple SD Gothic Neo',Malgun Gothic,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1A56DB,#1e40af);padding:32px 36px;text-align:center;">
      <div style="font-size:28px;margin-bottom:8px;">${icon}</div>
      <div style="color:#fff;font-size:22px;font-weight:800;">${esc(title)}</div>
      <div style="color:rgba(255,255,255,0.75);font-size:14px;margin-top:6px;">${esc(subtitle)}</div>
    </div>
    ${body}
    <div style="background:#f9fafb;padding:18px 36px;text-align:center;border-top:1px solid #f3f4f6;">
      <div style="font-size:12px;color:#9ca3af;">${esc(footer)}</div>
    </div>
  </div>
</body>
</html>`;
}

function createBookingEmail({ passengerName, bookingRef, slices = [], totalAmount, totalCurrency }) {
  const flightRows = slices.map((slice, index) => {
    const first = slice.segments?.[0];
    const last = slice.segments?.[slice.segments.length - 1];
    const label = slices.length > 1 ? (index === 0 ? '가는 편' : '오는 편') : '항공편';
    return `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;">
          ${esc(first?.origin?.iata_code || '')} → ${esc(last?.destination?.iata_code || '')}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;color:#374151;font-size:13px;">${formatDateTime(first?.departing_at)}</td>
      </tr>`;
  }).join('');

  const body = `
    <div style="padding:32px 36px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:12px;color:#9ca3af;margin-bottom:8px;letter-spacing:1px;text-transform:uppercase;">예약 번호</div>
        <div style="font-size:32px;font-weight:900;color:#1A56DB;letter-spacing:4px;font-family:monospace;">${esc(bookingRef)}</div>
      </div>
      <div style="background:#f9fafb;border-radius:10px;padding:20px;margin-bottom:20px;">
        <div style="font-size:13px;font-weight:700;color:#374151;margin-bottom:12px;">안녕하세요, ${esc(passengerName)}님</div>
        <div style="font-size:13px;color:#6b7280;line-height:1.7;">
          예약해주셔서 감사합니다. 아래 예약번호를 저장해주세요.<br>
          이 메일은 <strong>테스트 환경</strong>에서 발송되었으며 실제 항공권은 발권되지 않습니다.
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #f3f4f6;border-radius:10px;overflow:hidden;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:10px 12px;text-align:left;font-size:12px;color:#9ca3af;font-weight:600;">구분</th>
            <th style="padding:10px 12px;text-align:left;font-size:12px;color:#9ca3af;font-weight:600;">구간</th>
            <th style="padding:10px 12px;text-align:left;font-size:12px;color:#9ca3af;font-weight:600;">출발</th>
          </tr>
        </thead>
        <tbody>${flightRows}</tbody>
      </table>
      <div style="margin-top:20px;text-align:right;">
        <div style="font-size:12px;color:#9ca3af;">총 결제금액</div>
        <div style="font-size:20px;font-weight:800;color:#1A56DB;">${formatAmount(totalAmount, totalCurrency)}</div>
      </div>
    </div>`;

  return {
    fromName: BRAND_NAME,
    subject: `[${BRAND_NAME}] 예약번호 ${bookingRef} - 테스트 예약이 완료되었습니다`,
    html: baseLayout({
      icon: '✈️',
      title: '예약이 완료되었습니다',
      subtitle: '테스트용 예약번호가 발급되었습니다',
      body,
      footer: `${BRAND_NAME} 예약 시스템 · ${TEST_FOOTER}`,
    }),
  };
}

function createESimEmail({ code, countries = [], totalPrice }) {
  const countryRows = countries.map((country) => {
    const config = country.config || {};
    return `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;">${esc(country.flag || '')} ${esc(country.name)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;">
          ${config.type === 'local' ? '로컬망' : '로밍망'} · ${Number(config.days || 0)}일 · ${esc(config.plan?.name || '')}
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;text-align:right;">
          ${formatAmount(config.plan?.price || 0)}
        </td>
      </tr>`;
  }).join('');

  const body = `
    <div style="padding:32px 36px;">
      <div style="background:#f0f4ff;border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
        <div style="font-size:12px;color:#6b7280;margin-bottom:8px;">eSIM 활성화 코드</div>
        <div style="font-size:22px;font-weight:800;letter-spacing:2px;color:#1A56DB;font-family:monospace;">${esc(code)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:10px 12px;text-align:left;font-size:13px;color:#6b7280;font-weight:600;">국가</th>
            <th style="padding:10px 12px;text-align:left;font-size:13px;color:#6b7280;font-weight:600;">플랜</th>
            <th style="padding:10px 12px;text-align:right;font-size:13px;color:#6b7280;font-weight:600;">금액</th>
          </tr>
        </thead>
        <tbody>${countryRows}</tbody>
      </table>
      <div style="text-align:right;font-size:16px;font-weight:700;color:#1A56DB;margin-bottom:24px;">
        총 ${formatAmount(totalPrice || 0)}
      </div>
      <div style="background:#f9fafb;border-radius:12px;padding:16px 20px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:10px;">eSIM 설치 방법</div>
        <ol style="margin:0;padding-left:20px;font-size:13px;color:#374151;line-height:1.8;">
          <li>기기 설정에서 이동통신 또는 셀룰러 메뉴를 엽니다.</li>
          <li>eSIM 추가를 선택한 뒤 QR 코드 또는 활성화 코드를 입력합니다.</li>
          <li>설치 완료 후 여행지 도착 시 데이터 회선을 켭니다.</li>
        </ol>
      </div>
    </div>`;

  return {
    fromName: `${BRAND_NAME} eSIM`,
    subject: `[${BRAND_NAME}] eSIM 활성화 코드 발급 완료 - ${code}`,
    html: baseLayout({
      icon: '📱',
      title: 'eSIM 구매가 완료되었습니다',
      subtitle: '테스트용 활성화 코드가 발급되었습니다',
      body,
      footer: `${BRAND_NAME} eSIM · 테스트 모드`,
    }),
  };
}

function createStayBookingEmail({
  guestName,
  bookingRef,
  hotelName,
  location,
  checkIn,
  checkOut,
  nights,
  guests,
  totalPrice,
  currency,
  image,
}) {
  const imageHtml = image
    ? `<img src="${esc(image)}" alt="${esc(hotelName)}" style="width:100%;height:190px;object-fit:cover;display:block;">`
    : '';

  const body = `
    ${imageHtml}
    <div style="padding:32px 36px;">
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:12px;color:#9ca3af;margin-bottom:8px;letter-spacing:1px;text-transform:uppercase;">예약 번호</div>
        <div style="font-size:30px;font-weight:900;color:#1A56DB;letter-spacing:3px;font-family:monospace;">${esc(bookingRef)}</div>
      </div>
      <div style="background:#f9fafb;border-radius:10px;padding:20px;margin-bottom:20px;">
        <div style="font-size:13px;font-weight:700;color:#374151;margin-bottom:12px;">안녕하세요, ${esc(guestName)}님</div>
        <div style="font-size:13px;color:#6b7280;line-height:1.7;">
          ${esc(hotelName)} 예약 확인 메일입니다.<br>
          이 메일은 <strong>테스트 환경</strong>에서 발송되었으며 실제 Hotelbeds 예약은 생성되지 않습니다.
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #f3f4f6;border-radius:10px;overflow:hidden;">
        <tbody>
          <tr><td style="padding:12px;color:#6b7280;border-bottom:1px solid #f3f4f6;">숙소</td><td style="padding:12px;text-align:right;font-weight:700;border-bottom:1px solid #f3f4f6;">${esc(hotelName)}</td></tr>
          <tr><td style="padding:12px;color:#6b7280;border-bottom:1px solid #f3f4f6;">지역</td><td style="padding:12px;text-align:right;font-weight:700;border-bottom:1px solid #f3f4f6;">${esc(location || '-')}</td></tr>
          <tr><td style="padding:12px;color:#6b7280;border-bottom:1px solid #f3f4f6;">일정</td><td style="padding:12px;text-align:right;font-weight:700;border-bottom:1px solid #f3f4f6;">${formatDate(checkIn)} - ${formatDate(checkOut)}</td></tr>
          <tr><td style="padding:12px;color:#6b7280;border-bottom:1px solid #f3f4f6;">숙박</td><td style="padding:12px;text-align:right;font-weight:700;border-bottom:1px solid #f3f4f6;">${Number(nights || 1)}박 · 성인 ${Number(guests || 1)}명</td></tr>
          <tr><td style="padding:12px;color:#6b7280;">총 결제금액</td><td style="padding:12px;text-align:right;font-weight:800;color:#1A56DB;">${formatAmount(totalPrice, currency)}</td></tr>
        </tbody>
      </table>
    </div>`;

  return {
    fromName: `${BRAND_NAME} 숙소`,
    subject: `[${BRAND_NAME}] 숙소 예약번호 ${bookingRef} - 테스트 예약이 완료되었습니다`,
    html: baseLayout({
      icon: '🏨',
      title: '숙소 예약이 완료되었습니다',
      subtitle: '테스트용 예약번호가 발급되었습니다',
      body,
      footer: `${BRAND_NAME} 숙소 예약 시스템 · ${TEST_FOOTER}`,
    }),
  };
}

module.exports = {
  BRAND_NAME,
  createBookingEmail,
  createESimEmail,
  createStayBookingEmail,
};
