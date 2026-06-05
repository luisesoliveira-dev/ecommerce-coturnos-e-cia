const Chip = ({ title, children }) => (
  <div
    title={title}
    className="h-8 px-2.5 flex items-center justify-center bg-branco/6 border border-branco/10 hover:border-gold/40 hover:bg-branco/10 transition-all duration-200 cursor-default min-w-11"
  >
    {children}
  </div>
);

export function PaymentIcons() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-start">
      {/* PIX - Path Oficial Banco Central */}
      <Chip title="Pix">
        <svg width="18" height="18" viewBox="0 0 512 512">
          <path
            fill="#32BCAD"
            d="M346.5 73.1c-12.5-12.5-32.8-12.5-45.3 0L171 203.3c-12.5 12.5-12.5 32.8 0 45.3L301.2 378.7c12.5 12.5 32.8 12.5 45.3 0l130.2-130.2c12.5-12.5 12.5-32.8 0-45.3L346.5 73.1zm-181 181c12.5-12.5 12.5-32.8 0-45.3L35.3 78.7c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l130.2 130.2c12.5 12.5 32.8 12.5 45.3 0zm0 130.2l-130.2 130.2c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L165.5 339c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM346.5 438.9c12.5 12.5 32.8 12.5 45.3 0l130.2-130.2c12.5-12.5 12.5-32.8 0-45.3L391.8 133.3c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l130.2 130.2c12.5 12.5 32.8 12.5 45.3 0z"
          />
        </svg>
      </Chip>

      {/* VISA - Centralização absoluta via alinhamento de SVG */}
      <Chip title="Visa">
        <svg
          width="34"
          height="20"
          viewBox="0 0 34 20"
          className="flex items-center justify-center"
        >
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="12"
            fill="white"
          >
            VISA
          </text>
        </svg>
      </Chip>

      <Chip title="Mastercard">
        <svg width="30" height="18" viewBox="0 0 30 18">
          <circle cx="11" cy="9" r="8.5" fill="#EB001B" />
          <circle cx="19" cy="9" r="8.5" fill="#F79E1B" />
          <path
            d="M15 2.2a8.5 8.5 0 0 1 0 13.6A8.5 8.5 0 0 1 15 2.2z"
            fill="#FF5F00"
          />
        </svg>
      </Chip>

      {/* ELO - Centralizado */}
      <Chip title="Elo">
        <svg width="28" height="20" viewBox="0 0 28 20">
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="13"
            fill="white"
          >
            elo
          </text>
        </svg>
      </Chip>

      <Chip title="American Express">
        <svg width="36" height="11" viewBox="0 0 36 11">
          <text
            x="0"
            y="10"
            fontFamily="sans-serif"
            fontWeight="800"
            fontSize="10"
            fill="#60A5FA"
            letterSpacing="1"
          >
            AMEX
          </text>
        </svg>
      </Chip>

      <Chip title="Boleto Bancário">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          {[0, 3, 5, 9, 11, 14, 16, 20].map((x, i) => (
            <rect
              key={i}
              x={x}
              y="0"
              width={i % 2 === 0 ? "2" : "1"}
              height="16"
              fill="white"
              opacity="0.7"
            />
          ))}
        </svg>
      </Chip>

      {/* MERCADO PAGO - Símbolo Handshake (Aperto de mão) */}
      <Chip title="Mercado Pago">
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#009EE3" />
          <path
            d="M30 55c2-2 5-2 7 0l8 8 20-20c2-2 5-2 7 0s2 5 0 7L48 74c-2 2-5 2-7 0l-11-11c-2-2-2-5 0-7z"
            fill="white"
          />
          <path
            d="M35 45c2-2 5-2 7 0l5 5c2 2 2 5 0 7l-5 5c-2 2-5 2-7 0s-2-5 0-7l5-5"
            stroke="white"
            strokeWidth="2"
            opacity="0.4"
          />
        </svg>
      </Chip>
    </div>
  );
}
