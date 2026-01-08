import { useState } from 'react'
import { Html } from '@react-three/drei'

function Hotspot({ position, label, description }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Html position={position} center>
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Marker */}
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: isOpen ? '#00ffff' : '#0099ff',
            border: '2px solid #0066cc',
            boxShadow: isOpen 
              ? '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)'
              : '0 0 10px rgba(0, 153, 255, 0.5)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#001122',
            }}
          />
        </div>

        {/* Popup */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '35px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #001122 0%, #003344 100%)',
              border: '1px solid #00aaff',
              borderRadius: '8px',
              padding: '16px',
              minWidth: '200px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 170, 255, 0.3)',
              color: '#aaffff',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '1.6',
              whiteSpace: 'nowrap',
              zIndex: 1000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Object Name */}
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#00ffff',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {label}
            </div>

            {/* Description */}
            <div
              style={{
                color: '#88ccff',
                marginBottom: '12px',
                fontSize: '12px',
              }}
            >
              {description}
            </div>

            {/* Technical Info */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(0, 170, 255, 0.3)',
              }}
            >
              {/* Normal Map Icon */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #0066ff, #00aaff)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 102, 255, 0.4)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L8 6L14 2V14L8 10L2 14V2Z"
                    stroke="#00ffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M8 6V10"
                    stroke="#00ffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div style={{ color: '#66aaff', fontSize: '11px' }}>
                2K Baked Normals
              </div>
            </div>

            {/* Arrow pointer */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #00aaff',
              }}
            />
          </div>
        )}
      </div>
    </Html>
  )
}

export default Hotspot

