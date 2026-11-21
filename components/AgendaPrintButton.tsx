'use client';

export default function AgendaPrintButton() {
  return (
    <button
      className="agenda-print-button no-print"
      type="button"
      onClick={() => window.print()}
    >
      <span aria-hidden="true">▤</span>
      Print / Save as PDF
    </button>
  );
}
