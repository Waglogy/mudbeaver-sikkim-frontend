// Decorative civil-engineering line drawings behind the requirements section:
// a roof truss and eco-dome along the top; rammed-earth wall, stone arch,
// bamboo frame and dry-stone retaining wall along the ground at the bottom.
// Lines with pathLength="1" are drawn in when the section scrolls into view.

const range = (start, end, step) => {
    const out = []
    for (let v = start; v <= end; v += step) out.push(v)
    return out
}

// Point on a circle; angle in degrees, 0 = right, 90 = up (SVG y grows downward)
const polar = (cx, cy, r, deg) => {
    const a = (deg * Math.PI) / 180
    return [cx + r * Math.cos(a), cy - r * Math.sin(a)]
}

function Line({ x1, y1, x2, y2, d = 0, className = "s" }) {
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            pathLength="1"
            className={className}
            style={{ "--d": d }}
        />
    )
}

// Dimension line with architectural slash ticks and a label
function Dim({ x1, y1, x2, y2, label, d = 0 }) {
    const vertical = x1 === x2
    const tick = (x, y) => (
        <line x1={x - 4} y1={y + 4} x2={x + 4} y2={y - 4} className="t" />
    )
    return (
        <g className="mb-draw__dim" style={{ "--d": d }}>
            <Line x1={x1} y1={y1} x2={x2} y2={y2} d={d} className="s thin" />
            {tick(x1, y1)}
            {tick(x2, y2)}
            {vertical ? (
                <text
                    x={x1 - 7}
                    y={(y1 + y2) / 2}
                    transform={`rotate(-90 ${x1 - 7} ${(y1 + y2) / 2})`}
                    textAnchor="middle"
                >
                    {label}
                </text>
            ) : (
                <text x={(x1 + x2) / 2} y={y1 - 6} textAnchor="middle">
                    {label}
                </text>
            )}
        </g>
    )
}

// Short diagonal soil hatching between x1 and x2 below a ground line at y
function Hatch({ x1, x2, y, depth = 12, step = 14 }) {
    return (
        <g className="mb-draw__fill">
            {range(x1, x2 - 8, step).map((x) => (
                <line key={x} x1={x} y1={y + depth} x2={x + 8} y2={y + 2} />
            ))}
        </g>
    )
}

function TopDrawing() {
    // Eco-dome: earthbag courses inside an elliptical profile
    const dome = { cx: 1110, cy: 104, rx: 130, ry: 84 }
    const courses = range(24, 94, 10).map((y) => {
        const half = dome.rx * Math.sqrt(1 - ((dome.cy - y) / dome.ry) ** 2)
        return { y, x1: dome.cx - half, x2: dome.cx + half }
    })
    return (
        <svg
            className="mb-draw mb-draw--top"
            viewBox="0 0 1440 124"
            aria-hidden="true"
            focusable="false"
        >
            {/* King-post roof truss */}
            <Line x1={70} y1={104} x2={470} y2={104} d={0.1} />
            <Line x1={70} y1={104} x2={270} y2={24} d={0.2} />
            <Line x1={270} y1={24} x2={470} y2={104} d={0.3} />
            <Line
                x1={270}
                y1={24}
                x2={270}
                y2={104}
                d={0.4}
                className="s thin"
            />
            <Line
                x1={270}
                y1={104}
                x2={170}
                y2={64}
                d={0.5}
                className="s thin"
            />
            <Line
                x1={270}
                y1={104}
                x2={370}
                y2={64}
                d={0.5}
                className="s thin"
            />
            <g className="mb-draw__fill">
                {[
                    [70, 104],
                    [270, 24],
                    [470, 104],
                    [270, 104],
                    [170, 64],
                    [370, 64],
                ].map(([x, y]) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
                ))}
                <path d="M62 117 L70 104 L78 117 Z" />
                <circle cx="470" cy="110" r="5" />
                <line x1="456" y1="117" x2="484" y2="117" />
            </g>
            <Dim
                x1={70}
                y1={10}
                x2={470}
                y2={10}
                label="KING POST TRUSS · SPAN 8.00 M"
                d={0.6}
            />

            {/* Section marker */}
            <g className="mb-draw__fill">
                <circle cx="720" cy="62" r="13" />
                <line x1="676" y1="62" x2="707" y2="62" />
                <line x1="733" y1="62" x2="764" y2="62" />
                <text x="720" y="66" textAnchor="middle">
                    A
                </text>
            </g>

            {/* Superadobe eco-dome */}
            <path
                d={`M${dome.cx - dome.rx} ${dome.cy} A${dome.rx} ${dome.ry} 0 0 1 ${dome.cx + dome.rx} ${dome.cy}`}
                pathLength="1"
                className="s"
                style={{ "--d": 0.3 }}
            />
            {courses.map(({ y, x1, x2 }, i) => (
                <Line
                    key={y}
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    d={0.5 + i * 0.05}
                    className="s thin"
                />
            ))}
            <path
                d="M1095 104 V88 A15 15 0 0 1 1125 88 V104"
                pathLength="1"
                className="s"
                style={{ "--d": 0.9 }}
            />
            <Line x1={950} y1={104} x2={1280} y2={104} d={0.2} />
            <Hatch x1={950} x2={1280} y={104} depth={12} step={12} />
            <Dim
                x1={1266}
                y1={20}
                x2={1266}
                y2={104}
                label="ECO-DOME"
                d={0.8}
            />

            {/* Bamboo A-frame */}
            <Line x1={1310} y1={114} x2={1376} y2={14} d={0.4} />
            <Line
                x1={1316}
                y1={114}
                x2={1382}
                y2={14}
                d={0.45}
                className="s thin"
            />
            <Line x1={1442} y1={114} x2={1376} y2={14} d={0.5} />
            <Line
                x1={1436}
                y1={114}
                x2={1370}
                y2={14}
                d={0.55}
                className="s thin"
            />
            <Line x1={1334} y1={74} x2={1418} y2={74} d={0.7} />
            <g className="mb-draw__fill">
                {[0.25, 0.5, 0.75].map((t) => (
                    <g key={t}>
                        <line
                            x1={1310 + 66 * t - 3}
                            y1={114 - 100 * t - 2}
                            x2={1316 + 66 * t + 3}
                            y2={114 - 100 * t + 2}
                        />
                        <line
                            x1={1442 - 66 * t + 3}
                            y1={114 - 100 * t - 2}
                            x2={1436 - 66 * t - 3}
                            y2={114 - 100 * t + 2}
                        />
                    </g>
                ))}
            </g>
        </svg>
    )
}

function BottomDrawing() {
    // Stone arch: intrados r=50, extrados r=68, springing at y=70
    const arch = { cx: 450, cy: 70, r1: 50, r2: 68 }
    const joints = range(15, 165, 15).map((deg) => [
        polar(arch.cx, arch.cy, arch.r1, deg),
        polar(arch.cx, arch.cy, arch.r2, deg),
    ])
    return (
        <svg
            className="mb-draw mb-draw--bottom"
            viewBox="0 0 1440 150"
            aria-hidden="true"
            focusable="false"
        >
            {/* Ground line and soil */}
            <Line x1={0} y1={110} x2={1000} y2={110} d={0} />
            <Hatch x1={0} x2={1000} y={110} depth={14} />

            {/* Rammed earth wall section on a stone footing */}
            <rect
                x="120"
                y="20"
                width="70"
                height="90"
                pathLength="1"
                className="s"
                style={{ "--d": 0.2 }}
            />
            {range(30, 100, 10).map((y, i) => (
                <Line
                    key={y}
                    x1={120}
                    y1={y}
                    x2={190}
                    y2={y}
                    d={0.4 + i * 0.06}
                    className="s thin"
                />
            ))}
            <rect
                x="100"
                y="110"
                width="110"
                height="26"
                pathLength="1"
                className="s"
                style={{ "--d": 0.5 }}
            />
            <g className="mb-draw__fill">
                {range(104, 200, 12).map((x) => (
                    <line key={x} x1={x} y1="134" x2={x + 10} y2="112" />
                ))}
            </g>
            <Line
                x1={120}
                y1={104}
                x2={190}
                y2={104}
                d={0.9}
                className="s dash"
            />
            <Dim x1={120} y1={10} x2={190} y2={10} label="450" d={0.7} />
            <Dim x1={88} y1={20} x2={88} y2={110} label="2.40 M" d={0.8} />
            <text className="mb-draw__label" x="230" y="44">
                RAMMED EARTH WALL
            </text>
            <text className="mb-draw__label" x="230" y="58">
                SECTION A–A
            </text>

            {/* Stone arch with voussoirs */}
            <path
                d={`M${arch.cx - arch.r1} ${arch.cy} A${arch.r1} ${arch.r1} 0 0 1 ${arch.cx + arch.r1} ${arch.cy}`}
                pathLength="1"
                className="s"
                style={{ "--d": 0.3 }}
            />
            <path
                d={`M${arch.cx - arch.r2} ${arch.cy} A${arch.r2} ${arch.r2} 0 0 1 ${arch.cx + arch.r2} ${arch.cy}`}
                pathLength="1"
                className="s"
                style={{ "--d": 0.35 }}
            />
            {joints.map(([[x1, y1], [x2, y2]], i) => (
                <Line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    d={0.6 + i * 0.04}
                    className="s thin"
                />
            ))}
            <Line x1={382} y1={70} x2={382} y2={110} d={0.5} />
            <Line x1={400} y1={70} x2={400} y2={110} d={0.5} />
            <Line x1={500} y1={70} x2={500} y2={110} d={0.5} />
            <Line x1={518} y1={70} x2={518} y2={110} d={0.5} />
            <text
                className="mb-draw__label"
                x="450"
                y="128"
                textAnchor="middle"
            >
                STONE ARCH · R 1.50 M
            </text>

            {/* Bamboo post-and-beam frame with knee braces */}
            <Line x1={680} y1={30} x2={680} y2={110} d={0.3} />
            <Line
                x1={686}
                y1={30}
                x2={686}
                y2={110}
                d={0.35}
                className="s thin"
            />
            <Line x1={860} y1={30} x2={860} y2={110} d={0.3} />
            <Line
                x1={854}
                y1={30}
                x2={854}
                y2={110}
                d={0.35}
                className="s thin"
            />
            <Line x1={660} y1={30} x2={880} y2={30} d={0.5} />
            <Line
                x1={660}
                y1={36}
                x2={880}
                y2={36}
                d={0.55}
                className="s thin"
            />
            <Line x1={686} y1={60} x2={712} y2={36} d={0.8} />
            <Line x1={854} y1={60} x2={828} y2={36} d={0.8} />
            <g className="mb-draw__fill">
                {[50, 70, 90].map((y) => (
                    <g key={y}>
                        <line x1="677" y1={y} x2="689" y2={y} />
                        <line x1="851" y1={y} x2="863" y2={y} />
                    </g>
                ))}
                <rect x="670" y="110" width="26" height="12" />
                <rect x="844" y="110" width="26" height="12" />
            </g>
            <text className="mb-draw__label" x="770" y="20" textAnchor="middle">
                BAMBOO POST &amp; BEAM
            </text>

            {/* Dry-stone retaining wall holding a hillside terrace */}
            <path
                d="M1000 110 L1060 110 L1060 60 L1018 60 Z"
                pathLength="1"
                className="s"
                style={{ "--d": 0.4 }}
            />
            {[70, 80, 90, 100].map((y, i) => {
                const left = 1018 - ((y - 60) / 50) * 18
                return (
                    <Line
                        key={y}
                        x1={left}
                        y1={y}
                        x2={1060}
                        y2={y}
                        d={0.6 + i * 0.05}
                        className="s thin"
                    />
                )
            })}
            <g className="mb-draw__fill">
                {[
                    [1036, 60, 1036, 70],
                    [1048, 70, 1048, 80],
                    [1030, 80, 1030, 90],
                    [1044, 90, 1044, 100],
                    [1026, 100, 1026, 110],
                    [1050, 100, 1050, 110],
                ].map(([x1, y1, x2, y2]) => (
                    <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
                {range(1072, 1430, 22).map((x, i) => (
                    <circle key={x} cx={x} cy={74 + ((i * 13) % 26)} r="1.6" />
                ))}
            </g>
            <Line x1={1060} y1={60} x2={1440} y2={60} d={0.3} />
            <Hatch x1={1060} x2={1440} y={60} depth={10} step={16} />

            {/* House on the terrace */}
            <path
                d="M1215 60 V34 H1295 V60"
                pathLength="1"
                className="s"
                style={{ "--d": 0.8 }}
            />
            <path
                d="M1205 36 L1255 10 L1305 36"
                pathLength="1"
                className="s"
                style={{ "--d": 0.95 }}
            />
            <path
                d="M1247 60 V44 H1263 V60"
                pathLength="1"
                className="s thin"
                style={{ "--d": 1.1 }}
            />
            <g className="mb-draw__fill">
                <path d="M1320 54 L1334 54 L1327 46 Z" />
                <text x="1340" y="54">
                    +1.50
                </text>
            </g>
            <text
                className="mb-draw__label"
                x="1030"
                y="134"
                textAnchor="middle"
            >
                DRY STONE RETAINING WALL
            </text>
        </svg>
    )
}

export default function BlueprintBackdrop() {
    return (
        <>
            <TopDrawing />
            <BottomDrawing />
        </>
    )
}
