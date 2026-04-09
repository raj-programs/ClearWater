import "./ngos.css";

import efi1 from "../assets/efi-1.jpeg";
import efi2 from "../assets/efi-2.jpeg";
import tbs1 from "../assets/tbs-1.jpeg";
import tbs2 from "../assets/tbs-2.jpeg";
import iwf1 from "../assets/iwf-1.jpeg";
import iwf2 from "../assets/iwf-2.jpeg";
import wateraid1 from "../assets/wateraid-1.jpeg";
import wateraid2 from "../assets/wateraid-2.jpeg";

const ngosData = [
  {
    id: 1,
    name: "Environmentalist Foundation of India (EFI)",
    type: "Non-profit environmental organization",
    founded: "2007",
    location: "Chennai, India",
    mission:
      "To restore and conserve India's degraded water bodies (lakes, rivers, wetlands) through scientific and community-driven approaches.",
    activities: [
      "Lake and river restoration projects",
      "Biodiversity conservation",
      "Volunteer-driven cleanup drives",
      "Environmental awareness campaigns",
    ],
    impact: [
      "Restored 40+ water bodies across India",
      "Thousands of volunteers engaged",
      "Improved local ecosystems and groundwater levels",
    ],
    credibility: [
      "Strong on-ground execution",
      "Visible before-after transformation",
      "Consistent long-term projects",
    ],
    credibilityLabel: "Why They're Credible",
    images: [efi1, efi2],
    website: "https://indiaenvironment.org",
  },
  {
    id: 2,
    name: "Tarun Bharat Sangh (TBS)",
    type: "Community-based water conservation organization",
    founded: "1975",
    location: "Rajasthan, India",
    founder: "Rajendra Singh",
    mission:
      "To revive rivers and ensure water security using traditional water conservation techniques.",
    activities: [
      "Construction of Johads (traditional water structures)",
      "River rejuvenation projects",
      "Community mobilization",
      "Water literacy programs",
    ],
    impact: [
      "Revived 10+ rivers",
      "Transformed drought-prone regions into water-secure zones",
      "Empowered rural communities",
    ],
    credibility: [
      "Proven large-scale environmental impact",
      "Community-led sustainable model",
      "Recognized globally",
    ],
    credibilityLabel: "Why They're Credible",
    images: [tbs1, tbs2],
    website: "https://tarunbharatsangh.in/",
  },
  {
    id: 3,
    name: "India Water Foundation",
    type: "Policy & awareness organization",
    founded: "2008",
    location: "India",
    mission:
      "To promote sustainable water management through awareness, policy advocacy, and research.",
    activities: [
      "Organizing conferences & seminars",
      "Water policy advocacy",
      "Research publications",
      "Awareness campaigns",
    ],
    impact: [
      "Collaboration with global organizations",
      "Influenced water-related discussions at policy level",
    ],
    credibility: [
      "Strong in awareness & policy",
      "Limited direct ground restoration work",
    ],
    credibilityLabel: "Reality Check",
    images: [iwf1, iwf2],
    website: "https://www.indiawaterfoundation.org/",
  },
  {
    id: 4,
    name: "WaterAid India",
    type: "International development organization",
    founded: "1986 (in India)",
    location: "India",
    parentOrg: "WaterAid",
    mission:
      "To ensure access to safe water, sanitation, and hygiene for underserved communities.",
    activities: [
      "Clean drinking water projects",
      "Sanitation infrastructure",
      "Hygiene awareness campaigns",
      "Community engagement",
    ],
    impact: [
      "Millions benefited across India",
      "Improved public health in rural areas",
    ],
    credibility: [
      "Not specifically river-focused",
      "Broader WASH (Water, Sanitation, Hygiene) focus",
    ],
    credibilityLabel: "Reality Check",
    images: [wateraid1, wateraid2],
    website: "https://www.wateraid.org/in/",
  },
];

function NgoCard({ ngo }) {
  return (
    <div className="ngo-card">
      {/* Image gallery */}
      <div className="ngo-images">
        {ngo.images.map((img, idx) => (
          <div key={idx} className="ngo-image-slot">
            {img ? (
              <img src={img} alt={`${ngo.name} photo ${idx + 1}`} />
            ) : (
              <div className="ngo-image-placeholder">
                <span>📷</span>
                <p>Image {idx + 1}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info section */}
      <div className="ngo-info">
        <h2 className="ngo-name">🌊 {ngo.name}</h2>

        <div className="ngo-meta">
          <span className="ngo-badge">{ngo.type}</span>
          <span className="ngo-badge">Est. {ngo.founded}</span>
          <span className="ngo-badge">📍 {ngo.location}</span>
          {ngo.founder && (
            <span className="ngo-badge">👤 {ngo.founder}</span>
          )}
          {ngo.parentOrg && (
            <span className="ngo-badge">🏢 {ngo.parentOrg}</span>
          )}
        </div>

        <div className="ngo-section">
          <h3>🎯 Mission</h3>
          <p>{ngo.mission}</p>
        </div>

        <div className="ngo-section">
          <h3>🔧 Key Activities</h3>
          <ul>
            {ngo.activities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="ngo-section">
          <h3>🌍 Impact</h3>
          <ul>
            {ngo.impact.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="ngo-section ngo-credibility">
          <h3>
            {ngo.credibilityLabel === "Why They're Credible" ? "✅" : "⚠️"}{" "}
            {ngo.credibilityLabel}
          </h3>
          <ul>
            {ngo.credibility.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <a
          href={ngo.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm text-center no-underline hover:from-sky-400 hover:to-blue-500 hover:shadow-[0_0_18px_rgba(56,189,248,0.5)] transition-all duration-300"
        >
          🤝 Join Us
        </a>
      </div>
    </div>
  );
}

function Ngos() {
  return (
    <div className="ngos-container">
      <div className="ngos-header">
        <h1>🤝 NGOs Working for Water Conservation</h1>
        <p>
          Discover organizations making a real difference in protecting and
          restoring India's water resources.
        </p>
      </div>

      <div className="ngos-grid">
        {ngosData.map((ngo) => (
          <NgoCard key={ngo.id} ngo={ngo} />
        ))}
      </div>
    </div>
  );
}

export default Ngos;
