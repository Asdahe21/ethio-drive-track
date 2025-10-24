import React, { useState } from "react";

const Samplereport = () => {
  const carImages = [
    "https://i.pinimg.com/736x/60/ed/51/60ed515df7e99fb41f1937faf02513b0.jpg",
    "https://i.pinimg.com/1200x/20/e6/2b/20e62b0d6ce8c305ee84c5183b63f65e.jpg",
    "https://i.pinimg.com/1200x/84/a7/10/84a710a8c2b103021e40c04a4430d140.jpg",
    "https://i.pinimg.com/736x/4e/f2/e8/4ef2e8397326097548354969aac8c5ec.jpg",
    "https://i.pinimg.com/736x/86/b1/41/86b1418b46f9f06b248a9c1ae84335ae.jpg",
    "https://i.pinimg.com/1200x/39/bd/5d/39bd5d09178378ad1796ce55d9149d64.jpg",
    "https://i.pinimg.com/1200x/0f/0e/07/0f0e071461b30bd3874fb023baede7e2.jpg",
    "https://i.pinimg.com/736x/c7/f8/6c/c7f86cf337f7110996841b4e2b0270a4.jpg",
    "https://i.pinimg.com/736x/d8/e5/2f/d8e52f5f92d6e3e5c9f1a2e3f4e2f9d5.jpg",
    "https://i.pinimg.com/736x/e0/f1/b7/e0f1b7f6c8d7e9b0b4e2f9d5c8a1e2b3.jpg",
    "https://i.pinimg.com/736x/f5/a9/3c/f5a93c8d7e9b0b4e2f9d5c8a1e2b3.jpg",
  ];

  const INITIAL_DISPLAY_COUNT = 7;

  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(null); 

  const remainingImagesCount = carImages.length - INITIAL_DISPLAY_COUNT;
  const imagesToRender = carImages.slice(0, showAllPhotos ? carImages.length : INITIAL_DISPLAY_COUNT);

  const handleShowMoreClick = () => setShowAllPhotos(true);
  const handleShowLessClick = () => setShowAllPhotos(false);

  const handleImageClick = (index) => setFullscreenIndex(index);
  const handleCloseFullscreen = () => setFullscreenIndex(null);
  
  const handleCycleImage = (direction) => {
    const total = carImages.length;
    let newIndex = fullscreenIndex + direction;

    if (newIndex < 0) {
      newIndex = total - 1; 
    } else if (newIndex >= total) {
      newIndex = 0; 
    }
    setFullscreenIndex(newIndex);
  };

  // Helper component for Commercial Use Check cards
  const CheckCard = ({ title, icon, status, detail }) => (
    <div style={commercialUseStyles.card}>
      <div style={commercialUseStyles.iconContainer}>{icon}</div>
      <h4 style={commercialUseStyles.title}>{title}</h4>
      <div style={commercialUseStyles.status}>
        <span style={commercialUseStyles.checkIcon}>✓</span> {status}
      </div>
      <p style={commercialUseStyles.detail}>{detail}</p>
    </div>
  );

  // Helper component for Theft Check cards
  const TheftCheckCard = ({ title, status, detail }) => (
    <div style={theftStyles.checkCard}>
        <h4 style={theftStyles.checkTitle}>{title}</h4>
        <div style={theftStyles.checkStatus}>
            <span style={theftStyles.checkIcon}>✓</span> {status}
        </div>
        <p style={theftStyles.checkDetail}>{detail}</p>
    </div>
  );
  
  // Helper component for Specs detail rows
  const SpecsDetailRow = ({ label, value }) => (
    <div style={specsStyles.detailRow}>
        <span style={specsStyles.detailLabel}>{label}</span>
        <span style={specsStyles.detailValue}>{value}</span>
    </div>
  );
  
  // Helper component for Title Timeline entries
  const TitleTimelineEntry = ({ date, title, details }) => (
    <div style={titleTimelineStyles.entry}>
        <div style={titleTimelineStyles.dot} />
        <div style={titleTimelineStyles.content}>
            <h4 style={titleTimelineStyles.title}>{title}</h4>
            <span style={titleTimelineStyles.date}>{date}</span>
            <p style={titleTimelineStyles.details}>{details}</p>
        </div>
    </div>
  );


  return (
    <div style={styles.container}>
      {/* Fullscreen Modal */}
      {fullscreenIndex !== null && (
        <div style={fullscreenStyles.overlay}>
          <button style={fullscreenStyles.closeButton} onClick={handleCloseFullscreen}>X</button>
          
          <button style={{...fullscreenStyles.navButton, left: '20px'}} onClick={() => handleCycleImage(-1)}>
            &lt;
          </button>
          
          <img 
            src={carImages[fullscreenIndex]} 
            alt={`Fullscreen ${fullscreenIndex + 1}`} 
            style={fullscreenStyles.image} 
            onClick={(e) => e.stopPropagation()} 
          />
          
          <button style={{...fullscreenStyles.navButton, right: '20px'}} onClick={() => handleCycleImage(1)}>
            &gt;
          </button>

          <div style={fullscreenStyles.counter}>
            {fullscreenIndex + 1} / {carImages.length}
          </div>
        </div>
      )}

      {/* Top Navigation / Report Tabs (Existing) */}
      <div style={styles.tabContainer}>
        <div style={styles.tabActive}>Overview</div>
        <div style={styles.tab}>Photos</div>
        <div style={styles.tab}>Commercial use check</div>
        <div style={styles.tab}>Theft</div>
        <div style={styles.tab}>Mileage</div>
        <div style={styles.tab}>Legal status check</div>
        <div style={styles.tab}>Title check</div>
        <div style={styles.tab}>Damage</div>
        <div style={styles.tab}>Natural disaster exposure</div>
        <div style={styles.tab}>Market value</div>
      </div>

      {/* Main Report Content */}
      <div style={styles.reportContent}>
        
        {/* Vehicle Header Section (Existing) */}
        <div style={styles.vehicleHeader}>
          <div style={styles.imagePlaceholder} />
          <div style={styles.headerDetails}>
            <h1 style={styles.vehicleName}>Toyota Corolla</h1>
            <div style={styles.vinTag}>1GACPCFF5XXXXX</div>
            <div style={styles.detailTags}>
                <span style={styles.gasolineTag}>Petrol</span>
                <span style={styles.yearTag}>2023</span>
            </div>
            <div style={styles.actionButtons}>
                <button style={styles.shareIcon}>Share</button>
            </div>
          </div>
        </div>

        {/* Status Cards Grid (Existing) */}
        <div style={styles.cardsGrid}>
          <div style={styles.card}><h3 style={styles.cardTitle}>Mileage</h3><div style={styles.attentionTag}>Attention</div><p style={styles.cardDetail}>Possible mileage rollback detected.</p></div>
          <div style={styles.card}><h3 style={styles.cardTitle}>Damage</h3><div style={styles.attentionTag}>Attention</div><p style={styles.cardDetail}>We found 1 record for this vehicle.</p></div>
          <div style={styles.card}><h3 style={styles.cardTitle}>Title check</h3><div style={styles.attentionTag}>Attention</div><p style={styles.cardDetail}>"Salvage" record found – possible past severe damage.</p></div>
          <div style={styles.card}><h3 style={styles.cardTitle}>Safety</h3><div style={styles.attentionTag}>Attention</div><p style={styles.cardDetail}>1 open or past safety recall(s) found for this vehicle.</p></div>
          <div style={styles.card}><h3 style={styles.cardTitle}>Emissions</h3><div style={styles.attentionTag}>Attention</div><p style={styles.cardDetail}>High CO₂ emission rating: 281 g/km.</p></div>
          <div style={styles.card}><h3 style={styles.cardTitle}>Commercial use check</h3><div style={styles.noIssuesTag}>No issues found</div><p style={styles.cardDetail}>No records of commercial use found.</p></div>
          <div style={styles.card}><h3 style={styles.cardTitle}>Legal status check</h3><div style={styles.noIssuesTag}>No issues found</div><p style={styles.cardDetail}>No financial or legal risk records found.</p></div>
          <div style={styles.card}><h3 style={styles.cardTitle}>Theft</h3><div style={styles.noIssuesTag}>No theft records found.</div><p style={styles.cardDetail}>No theft records found.</p></div>
        </div>

        {/* Data Sources Footer (Existing) */}
        <div style={styles.dataSourceBox}>
            
            <div style={styles.dataLeft}>
                <h3 style={styles.dataTitle}>Data sources</h3>
                <p style={styles.dataText}>We checked 50+ data sources from all over the country</p>
            </div>
        </div>

        {/* Photos Section (Existing) */}
        <div style={styles.photoSection}>
            <h2 style={styles.photoTitle}>Photos</h2>
            <div style={styles.photoGrid}>
                {imagesToRender.map((image, index) => {
                    const globalIndex = index;
                    
                    if (!showAllPhotos && index === INITIAL_DISPLAY_COUNT - 1 && remainingImagesCount > 0) {
                        return (
                            <div key={index} style={styles.photoOverlayContainer} onClick={handleShowMoreClick}>
                                <img src={image} alt={`Car ${globalIndex + 1}`} style={styles.photoImage} />
                                <div style={styles.overlayText}>+{remainingImagesCount}</div>
                            </div>
                        );
                    }
                    
                    return (
                        <div key={index} style={styles.photoWrapper} onClick={() => handleImageClick(globalIndex)}>
                            <img 
                                src={image} 
                                alt={`Car ${globalIndex + 1}`} 
                                style={styles.photoImage} 
                            />
                        </div>
                    );
                })}
            </div>
            
            {remainingImagesCount > 0 && !showAllPhotos && (
                <button style={styles.showMoreButton} onClick={handleShowMoreClick}>
                    Show more
                </button>
            )}

            {showAllPhotos && carImages.length > INITIAL_DISPLAY_COUNT && (
                <button style={styles.showMoreButton} onClick={handleShowLessClick}>
                    Show less
                </button>
            )}
        </div>

        {/* Commercial Use Check Section (Existing) */}
        <div style={commercialUseStyles.container}>
            <h2 style={commercialUseStyles.mainTitle}>Commercial use check</h2>
            <p style={commercialUseStyles.description}>
                Was the vehicle used as a taxi, rental, or other service vehicle? Note: such vehicles 
                may be in worse condition than usual.
            </p>

            <div style={commercialUseStyles.successBanner}>
                <span style={commercialUseStyles.successIcon}>✓</span>
                No issues found
                <p style={commercialUseStyles.successText}>No records of vehicle being used in irregular manner</p>
            </div>

            <h3 style={commercialUseStyles.subTitle}>Here's what we checked:</h3>

            <div style={commercialUseStyles.checksGrid}>
                <CheckCard title="Taxi" icon="🚕" status="No record found" detail="No evidence of being used as a taxi" />
                <CheckCard title="Transport" icon="📦" status="No record found" detail="No evidence of being used as a transport vehicle" />
                <CheckCard title="Rental" icon="🔑" status="No record found" detail="No evidence of being used as a rental vehicle" />
                <CheckCard title="Police" icon="🛡️" status="No record found" detail="No evidence of being used by police" />
                <CheckCard title="Demo" icon="💳" status="No record found" detail="No evidence of being used as a demo vehicle" />
                <CheckCard title="Driving school vehicle" icon="🎓" status="No record found" detail="No evidence of being used as a driving school vehicle" />
            </div>
        </div>

        {/* Theft Section (Existing) */}
        <div style={theftStyles.container}>
            <h2 style={theftStyles.mainTitle}>Theft</h2>
            <p style={theftStyles.description}>
                Is the vehicle currently marked as stolen? Was it stolen in the past? Has it been recovered?
            </p>

            <div style={theftStyles.successBanner}>
                <span style={theftStyles.successIcon}>✓</span>
                No issues found
                <p style={theftStyles.successText}>We didn't find any records that the vehicle was stolen.</p>
            </div>

            <div style={theftStyles.noteBox}>
                <span style={theftStyles.noteIcon}>ⓘ</span> Note
                <p style={theftStyles.noteText}>
                    Police database stolen vehicle check completed from all the 10 Regional states and 2 city administration.
                </p>
            </div>

            <h3 style={theftStyles.subTitle}>Here's what we checked:</h3>

            <div style={theftStyles.checksGrid}>
                <TheftCheckCard 
                    title="Currently wanted as stolen" 
                    status="No record found" 
                    detail="No record found" 
                />
                <TheftCheckCard 
                    title="Stolen in the past" 
                    status="No record found" 
                    detail="No past theft records found for this vehicle." 
                />
            </div>

            <h4 style={theftStyles.countriesTitle}>Police database stolen vehicle check completed in:</h4>
            
            <div style={theftStyles.countriesGrid}>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>AD</span> Addis Ababa</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>DR</span> Dire Dawa</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>TG</span> Tigray </div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>AM</span> Amhara</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>AF</span> Afar</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>GB</span> Gambela</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>BG</span> Benshangul Gumz</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>OR</span> Oromia</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>SP</span> South People</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>SD</span> Sidama</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>SM</span> Somali</div>
                <div style={theftStyles.countryItem}><span style={theftStyles.countryFlag}>HR</span> Harari</div>

            </div>

        </div>
        
        {/* Mileage Section (Existing) */}
        <div style={mileageStyles.container}>
            <h2 style={mileageStyles.mainTitle}>Mileage</h2>
            <p style={mileageStyles.description}>
                Are there signs of mileage rollbacks or discrepancies?
            </p>

            <div style={mileageStyles.attentionBanner}>
                <span style={mileageStyles.attentionIcon}>⚠</span> Attention
                <p style={mileageStyles.attentionText}>This vehicle may have a fake mileage!</p>
            </div>

            <div style={mileageStyles.noteBox}>
                <span style={mileageStyles.noteIcon}>ⓘ</span> Note
                <ul style={mileageStyles.noteList}>
                    <li>Last known mileage: **84,121 km**</li>
                    <li>**7 mileage records found**</li>
                </ul>
            </div>

            <div style={mileageStyles.chartContainer}>
                <div style={mileageStyles.chartYAxisLabel}>Mileage</div>
                <div style={mileageStyles.chartLine}>
                    <div style={mileageStyles.chartHighlight} />
                    <div style={mileageStyles.dataPoint}>
                        <div style={mileageStyles.dataPointLabel}>
                            Mileage 04/2023<br/>
                            **84,121 km**
                        </div>
                    </div>
                </div>
                <div style={mileageStyles.chartXAxisLabel}>2015 . . . 2017 . . . 2019 . . . 2021 . . . 2023</div>
                <div style={mileageStyles.chartLegend}>
                    <span style={mileageStyles.legendItem}>— Mileage</span>
                    <span style={mileageStyles.legendItem}>— No driving</span>
                    <span style={mileageStyles.legendItem}>— Typical records</span>
                    <span style={mileageStyles.legendItem}>— Rollback</span>
                </div>
            </div>
        </div>
        
        {/* --- NEW LEGAL STATUS CHECK SECTION --- */}
        <div style={legalStatusStyles.container}>
            <h2 style={legalStatusStyles.mainTitle}>Legal status check</h2>
            <p style={legalStatusStyles.description}>
                Are there any risks related to the vehicle's legal status? Check for liens, write-offs, or active loans.
            </p>

            <div style={legalStatusStyles.successBanner}>
                <span style={legalStatusStyles.successIcon}>✓</span>
                No issues found
                <p style={legalStatusStyles.successText}>No financial or legal risk records found.</p>
            </div>

            <h3 style={legalStatusStyles.subTitle}>Here's what we checked:</h3>
            
            <div style={legalStatusStyles.checksGrid}>
                <div style={legalStatusStyles.checkCard}>
                    <div style={legalStatusStyles.icon}>⚖️</div>
                    <h4 style={legalStatusStyles.checkTitle}>Lien/Active Loan</h4>
                    <p style={legalStatusStyles.checkStatusSuccess}>No record found</p>
                    <p style={legalStatusStyles.checkDetail}>No active financial obligations found.</p>
                </div>
                <div style={legalStatusStyles.checkCard}>
                    <div style={legalStatusStyles.icon}>🚫</div>
                    <h4 style={legalStatusStyles.checkTitle}>Write-Off Records</h4>
                    <p style={legalStatusStyles.checkStatusSuccess}>No record found</p>
                    <p style={legalStatusStyles.checkDetail}>No permanent write-off records found.</p>
                </div>
                <div style={legalStatusStyles.checkCard}>
                    <div style={legalStatusStyles.icon}>📜</div>
                    <h4 style={legalStatusStyles.checkTitle}>Export/Import Records</h4>
                    <p style={legalStatusStyles.checkStatusSuccess}>1 record found</p>
                    <p style={legalStatusStyles.checkDetail}>Exported from the US to Canada in 2018.</p>
                </div>
            </div>
        </div>

        {/* --- NEW TITLE CHECK SECTION --- */}
        <div style={titleCheckStyles.container}>
            <h2 style={titleCheckStyles.mainTitle}>Title check</h2>
            <p style={titleCheckStyles.description}>
                Check if the vehicle has been marked with any negative title brands (e.g., Salvage, Flood, Fire).
            </p>

            <div style={titleCheckStyles.attentionBanner}>
                <span style={titleCheckStyles.attentionIcon}>⚠</span> Attention
                <p style={titleCheckStyles.attentionText}>"Rebuilt/Reconstructed" record found – possible past severe damage.</p>
            </div>

            <h3 style={titleCheckStyles.subTitle}>Title Brands Found:</h3>
            
            <div style={titleCheckStyles.brandsGrid}>
                <div style={titleCheckStyles.brandCard}>
                    <h4 style={titleCheckStyles.brandTitle}>Salvage</h4>
                    <p style={titleCheckStyles.brandStatusSuccess}>No record found</p>
                    <p style={titleCheckStyles.brandDetail}>No records of Salvage was found related brands.</p>
                </div>
                <div style={titleCheckStyles.brandCard}>
                    <h4 style={titleCheckStyles.brandTitle}>Flood/Hail</h4>
                    <p style={titleCheckStyles.brandStatusSuccess}>No record found</p>
                    <p style={titleCheckStyles.brandDetail}>No records of flood or hail damage related brands.</p>
                </div>
                <div style={titleCheckStyles.brandCard}>
                    <h4 style={titleCheckStyles.brandTitle}>Rebuilt/Reconstructed</h4>
                    <p style={titleCheckStyles.brandStatusAttention}>RECORD FOUND</p>
                    <p style={titleCheckStyles.brandDetail}>Was rebuilt title after major damage.</p>
                </div>
            </div>
            
            <p style={titleCheckStyles.note}>
                <span style={titleCheckStyles.noteIcon}>ⓘ</span> **Important**: Always verify the current physical title. Title brands can vary by state.
            </p>
        </div>
        
        {/* --- NEW DAMAGE SECTION --- */}
        <div style={damageStyles.container}>
            <h2 style={damageStyles.mainTitle}>Damage</h2>
            <p style={damageStyles.description}>
                Check for reported damage records, including accident reports and insurance claims.
            </p>

            <div style={damageStyles.attentionBanner}>
                <span style={damageStyles.attentionIcon}>⚠</span> Attention
                <p style={damageStyles.attentionText}>We found **1 damage record** for this vehicle.</p>
            </div>

            <div style={damageStyles.damageRecord}>
                <h3 style={damageStyles.recordTitle}>Accident Report</h3>
                <div style={damageStyles.recordDetails}>
                    <p><strong>Date:</strong> 2018-05-15</p>
                    <p><strong>Country:</strong> United States 🇺🇸</p>
                    <p><strong>Severity:</strong> <span style={damageStyles.severityHigh}>High (Total Loss)</span></p>
                    <p><strong>Estimated Repair Cost:</strong> N/A (Deemed non-repairable)</p>
                    <p><strong>Area of Impact:</strong> Front End</p>
                </div>
            </div>

            <div style={damageStyles.noDamageNote}>
                <span style={damageStyles.noteIcon}>✓</span> **No other records found.** We did not find any records of minor damage or other claims.
            </div>
        </div>

        {/* --- NEW SPECS SECTION --- */}
        <div style={specsStyles.container}>
            <h2 style={specsStyles.mainTitle}>Vehicle Specifications (Specs)</h2>
            <p style={specsStyles.description}>
                Detailed information about the car's original factory specifications.
            </p>

            <h3 style={specsStyles.subTitle}>Basic Information</h3>
            <div style={specsStyles.detailsGrid}>
                <SpecsDetailRow label="Make" value="Toyota" />
                <SpecsDetailRow label="Model" value="Corolla" />
                <SpecsDetailRow label="Year" value="2023" />
                <SpecsDetailRow label="Body Type" value="Sedan" />
                <SpecsDetailRow label="VIN" value="1GACPCFF5XXXXX" />
                <SpecsDetailRow label="Country of Manufacture" value="United States 🇺🇸" />
            </div>

            <h3 style={specsStyles.subTitle}>Engine & Performance</h3>
            <div style={specsStyles.detailsGrid}>
                <SpecsDetailRow label="Engine Type" value="5.0L V8 Naturally Aspirated" />
                <SpecsDetailRow label="Fuel Type" value="petrol" />
                <SpecsDetailRow label="Power" value="435 hp (324 kW)" />
                <SpecsDetailRow label="Torque" value="542 Nm" />
                <SpecsDetailRow label="Transmission" value="6-Speed Manual" />
                <SpecsDetailRow label="Drive Train" value="Rear Wheel Drive (RWD)" />
            </div>
        </div>

        {/* --- NEW TITLE CHANGES TIMELINE --- */}
        <div style={titleTimelineStyles.container}>
            <h2 style={titleTimelineStyles.mainTitle}>Title Changes and Events</h2>
            <p style={titleTimelineStyles.description}>
                A history of key events and title records associated with the vehicle.
            </p>

            <div style={titleTimelineStyles.timeline}>
                <TitleTimelineEntry 
                    date="2023-04-10" 
                    title="Last Mileage Record" 
                    details="Mileage recorded at 84,121 km (Private Inspection)." 
                />
                <TitleTimelineEntry 
                    date="2018-12-01" 
                    title="New Title Issued: Exported to Canada" 
                    details="Vehicle was exported from the USA and received a Canadian title." 
                />
                <TitleTimelineEntry 
                    date="2018-05-20" 
                    title="Salvage Title Issued (USA)" 
                    details="Declared Total Loss by an insurer due to a severe frontal accident." 
                />
                <TitleTimelineEntry 
                    date="2018-05-15" 
                    title="Damage/Accident Reported" 
                    details="First record of the severe frontal accident." 
                />
                <TitleTimelineEntry 
                    date="2015-11-20" 
                    title="Title Issued: First Owner" 
                    details="First title issued in California, USA." 
                />
            </div>

            <p style={titleTimelineStyles.footerNote}>
                The timeline shows 5 key events. **2 title changes** recorded.
            </p>
        </div>

      </div>
    </div>
  );
};

// --- LEGAL STATUS CHECK STYLES ---
const legalStatusStyles = {
    container: {
        paddingTop: '40px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    successBanner: {
        backgroundColor: '#e6ffed', color: '#28a745', padding: '15px', borderRadius: '8px',
        fontSize: '1.2em', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '30px',
    },
    successIcon: { fontSize: '1.5em', marginRight: '10px', lineHeight: 1, },
    successText: { fontSize: '0.8em', fontWeight: 'normal', color: '#28a745', marginLeft: '15px', },
    subTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '20px', },
    checksGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px',
    },
    checkCard: {
        backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)', textAlign: 'left',
    },
    icon: { fontSize: '2em', marginBottom: '10px', },
    checkTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '5px', },
    checkStatusSuccess: {
        fontSize: '0.9em', fontWeight: 'bold', color: '#28a745', marginBottom: '10px',
    },
    checkDetail: { fontSize: '0.9em', color: '#666', }
};

// --- TITLE CHECK STYLES ---
const titleCheckStyles = {
    container: {
        paddingTop: '40px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    attentionBanner: {
        backgroundColor: '#fffbe6', color: '#ffc107', padding: '15px', borderRadius: '8px',
        fontSize: '1.2em', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '30px',
    },
    attentionIcon: { fontSize: '1.5em', marginRight: '10px', lineHeight: 1, },
    attentionText: { fontSize: '0.8em', fontWeight: 'normal', color: '#ffc107', marginLeft: '15px', },
    subTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '20px', },
    brandsGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px',
    },
    brandCard: {
        backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)', textAlign: 'left',
    },
    brandTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '5px', },
    brandStatusAttention: {
        fontSize: '0.9em', fontWeight: 'bold', color: '#ffc107', marginBottom: '10px',
    },
    brandStatusSuccess: {
        fontSize: '0.9em', fontWeight: 'bold', color: '#28a745', marginBottom: '10px',
    },
    brandDetail: { fontSize: '0.9em', color: '#666', },
    note: {
        marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px',
        fontSize: '0.9em', color: '#666', display: 'flex', alignItems: 'center',
    },
    noteIcon: { fontSize: '1.2em', marginRight: '8px', color: '#007bff' }
};

// --- DAMAGE STYLES ---
const damageStyles = {
    container: {
        paddingTop: '40px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    attentionBanner: {
        backgroundColor: '#fffbe6', color: '#ffc107', padding: '15px', borderRadius: '8px',
        fontSize: '1.2em', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '30px',
    },
    attentionIcon: { fontSize: '1.5em', marginRight: '10px', lineHeight: 1, },
    attentionText: { fontSize: '0.8em', fontWeight: 'normal', color: '#ffc107', marginLeft: '15px', },
    
    damageRecord: {
        border: '1px solid #ffc10750', padding: '20px', borderRadius: '8px', marginBottom: '20px',
        backgroundColor: '#fffbe650',
    },
    recordTitle: { fontSize: '1.2em', fontWeight: '700', color: '#333', borderBottom: '1px solid #ffc10720', paddingBottom: '10px', marginBottom: '15px', },
    recordDetails: { lineHeight: '1.6', fontSize: '0.95em', color: '#444' },
    severityHigh: { color: '#dc3545', fontWeight: 'bold' },
    viewPhotosButton: {
        marginTop: '15px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white',
        border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9em', fontWeight: '600',
    },
    noDamageNote: {
        padding: '15px', backgroundColor: '#e6ffed', color: '#28a745', borderRadius: '8px',
        fontSize: '0.9em', display: 'flex', alignItems: 'center',
    },
    noteIcon: { fontSize: '1.2em', marginRight: '8px', }
};

// --- SPECS STYLES ---
const specsStyles = {
    container: {
        paddingTop: '40px',
        background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)', 
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    subTitle: { fontSize: '1.3em', fontWeight: '700', color: '#333', marginTop: '30px', marginBottom: '15px', },
    detailsGrid: {
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 30px', 
        backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px',
    },
    detailRow: {
        display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0',
    },
    detailLabel: { fontSize: '0.95em', color: '#666', },
    detailValue: { fontSize: '0.95em', color: '#333', fontWeight: '600', },
};

// --- TITLE TIMELINE STYLES ---
const titleTimelineStyles = {
    container: {
        paddingTop: '40px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    timeline: {
        position: 'relative',
        padding: '20px 0 20px 25px', 
    },
    entry: {
        position: 'relative',
        paddingBottom: '30px',
        paddingLeft: '30px',
        borderLeft: '2px solid #e0e0e0',
        marginBottom: '15px',
    },
    dot: {
        position: 'absolute', left: '-8px', top: '0',
        width: '16px', height: '16px', borderRadius: '50%',
        backgroundColor: '#007bff', 
        border: '3px solid white', 
        boxShadow: '0 0 0 2px #007bff',
    },
    content: {
        backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px',
        border: '1px solid #eee',
    },
    date: { fontSize: '0.85em', color: '#999', display: 'block', marginBottom: '5px', },
    title: { fontSize: '1.1em', fontWeight: '700', color: '#333', margin: '0 0 5px 0', },
    details: { fontSize: '0.9em', color: '#555', margin: 0, },
    footerNote: {
        marginTop: '20px', fontSize: '0.9em', color: '#666', textAlign: 'center',
    }
};


// --- EXISTING SECTION STYLES (Mileage, Theft, Commercial Use) ---
const mileageStyles = { /* ... (existing styles) ... */
    container: {
        paddingTop: '40px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    attentionBanner: {
        backgroundColor: '#fffbe6', 
        color: '#ffc107', 
        padding: '15px',
        borderRadius: '8px',
        fontSize: '1.2em',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
    },
    attentionIcon: { fontSize: '1.5em', marginRight: '10px', lineHeight: 1, },
    attentionText: { fontSize: '0.8em', fontWeight: 'normal', color: '#ffc107', marginLeft: '15px', },
    noteBox: {
        backgroundColor: '#f5f8ff', color: '#007bff', padding: '15px', borderRadius: '8px',
        fontSize: '1em', fontWeight: '600', display: 'flex', alignItems: 'flex-start', marginBottom: '30px',
    },
    noteIcon: { fontSize: '1.2em', marginRight: '10px', marginTop: '3px', },
    noteList: { 
        listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9em', fontWeight: 'normal', color: '#333',
    },
    insightBox: {
        backgroundColor: '#e0f7fa', color: '#00bcd4', padding: '15px', borderRadius: '8px',
        fontSize: '1em', fontWeight: '600', display: 'flex', alignItems: 'flex-start', marginBottom: '30px',
    },
    insightIcon: { fontSize: '1.2em', marginRight: '10px', marginTop: '3px', color: '#007bff' },
    insightText: { fontSize: '0.9em', fontWeight: 'normal', color: '#333', marginLeft: '15px', lineHeight: '1.4' },
    chartContainer: {
        position: 'relative',
        height: '350px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chartYAxisLabel: {
        position: 'absolute', top: '10px', left: '10px', fontSize: '0.8em', color: '#999',
    },
    chartLine: {
        flexGrow: 1, width: '100%', position: 'relative',
        borderBottom: '1px dotted #ccc',
    },
    chartHighlight: {
        position: 'absolute', left: '40%', top: '0', bottom: '0', width: '20%',
        backgroundColor: 'rgba(255, 255, 0, 0.3)', 
    },
    dataPoint: {
        position: 'absolute', right: '5%', top: '30%',
        width: '10px', height: '10px', backgroundColor: '#007bff', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    dataPointLabel: {
        position: 'absolute', bottom: '15px', right: '-10px', fontSize: '0.75em', 
        backgroundColor: 'white', padding: '5px', borderRadius: '4px', border: '1px solid #ccc',
        whiteSpace: 'nowrap', color: '#333'
    },
    chartXAxisLabel: {
        width: '95%', textAlign: 'center', fontSize: '0.8em', color: '#666', marginTop: '10px',
    },
    chartLegend: {
        display: 'flex', gap: '15px', fontSize: '0.75em', color: '#666', marginTop: '20px',
    },
    legendItem: { /* Placeholder */ }
};

const theftStyles = { /* ... (existing styles) ... */
    container: {
        paddingTop: '40px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    successBanner: {
        backgroundColor: '#e6ffed', color: '#28a745', padding: '15px', borderRadius: '8px',
        fontSize: '1.2em', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '30px',
    },
    successIcon: { fontSize: '1.5em', marginRight: '10px', lineHeight: 1, },
    successText: { fontSize: '0.8em', fontWeight: 'normal', color: '#28a745', marginLeft: '15px', },
    noteBox: {
        backgroundColor: '#f5f8ff', color: '#007bff', padding: '15px', borderRadius: '8px',
        fontSize: '1em', fontWeight: '600', display: 'flex', alignItems: 'flex-start', marginBottom: '30px',
    },
    noteIcon: { fontSize: '1.2em', marginRight: '10px', marginTop: '3px', },
    noteText: { fontSize: '0.9em', fontWeight: 'normal', color: '#007bff', marginLeft: '15px', },
    subTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '20px', },
    checksGrid: { display: 'flex', gap: '20px', marginBottom: '40px', },
    checkCard: {
        flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)', textAlign: 'left',
    },
    checkTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '5px', },
    checkStatus: {
        fontSize: '0.9em', fontWeight: 'bold', color: '#28a745', marginBottom: '10px',
        display: 'flex', alignItems: 'center',
    },
    checkIcon: { marginRight: '5px', fontSize: '1.1em', },
    checkDetail: { fontSize: '0.9em', color: '#666', },
    countriesTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '15px', },
    countriesGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px',
    },
    countryItem: { display: 'flex', alignItems: 'center', fontSize: '0.95em', color: '#333', },
    countryFlag: { fontSize: '1.2em', marginRight: '8px', },
};

const commercialUseStyles = { /* ... (existing styles) ... */
    container: {
        paddingTop: '40px',
        borderTop: '1px solid #e0e0e0',
        marginTop: '40px',
        textAlign: 'left',
    },
    mainTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '10px', },
    description: { fontSize: '0.95em', color: '#666', marginBottom: '20px', maxWidth: '600px', },
    successBanner: {
        backgroundColor: '#e6ffed', color: '#28a745', padding: '15px', borderRadius: '8px',
        fontSize: '1.2em', fontWeight: '600', display: 'flex', alignItems: 'center', marginBottom: '30px',
    },
    successIcon: { fontSize: '1.5em', marginRight: '10px', lineHeight: 1, },
    successText: { fontSize: '0.8em', fontWeight: 'normal', color: '#28a745', marginLeft: '15px', },
    subTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '20px', },
    checksGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px',
    },
    card: {
        backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.03)', textAlign: 'left',
    },
    iconContainer: { fontSize: '2.5em', marginBottom: '10px', },
    title: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '5px', },
    status: {
        fontSize: '0.9em', fontWeight: 'bold', color: '#28a745', marginBottom: '10px',
        display: 'flex', alignItems: 'center',
    },
    checkIcon: { marginRight: '5px', fontSize: '1.1em', },
    detail: { fontSize: '0.9em', color: '#666', }
};

// --- EXISTING GENERAL/HEADER STYLES ---
const styles = {
  container: {
    minHeight: "100vh", background: "#f3f7fb", fontFamily: "'Arial', sans-serif", padding: "0 20px 80px 20px",
  },
  tabContainer: {
    display: 'flex', overflowX: 'auto', backgroundColor: 'white', padding: '15px 10px', borderBottom: '1px solid #e0e0e0', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  tab: { padding: '8px 15px', fontSize: '0.9em', color: '#666', cursor: 'pointer', whiteSpace: 'nowrap', },
  tabActive: { padding: '8px 15px', fontSize: '0.9em', color: '#007bff', borderBottom: '2px solid #007bff', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', },
  reportContent: {
    maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
  },
  vehicleHeader: { display: 'flex', gap: '30px', paddingBottom: '30px', borderBottom: '1px solid #e0e0e0', marginBottom: '30px', alignItems: 'center', },
  imagePlaceholder: { width: '200px', height: '120px', backgroundColor: '#eee', borderRadius: '8px', },
  headerDetails: { textAlign: 'left', },
  vehicleName: { fontSize: '2em', fontWeight: '700', color: '#333', marginBottom: '5px', },
  vinTag: { fontSize: '0.9em', color: '#666', backgroundColor: '#f0f0f0', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '10px', },
  detailTags: { display: 'flex', gap: '10px', marginBottom: '15px', },
  gasolineTag: { backgroundColor: '#e0f7fa', color: '#00bcd4', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8em', },
  yearTag: { backgroundColor: '#f3e5f5', color: '#9c27b0', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8em', },
  shareIcon: { padding: '8px 15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white', color: '#333', cursor: 'pointer', fontSize: '0.9em', },
  cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px', },
  card: { backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0', textAlign: 'left', },
  cardTitle: { fontSize: '1.1em', fontWeight: '600', color: '#333', marginBottom: '10px', },
  attentionTag: { backgroundColor: '#fffbe6', color: '#ffc107', border: '1px solid #ffeeba', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px', },
  noIssuesTag: { backgroundColor: '#e6ffed', color: '#28a745', border: '1px solid #c3e6cb', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em', fontWeight: 'bold', display: 'inline-block', marginBottom: '10px', },
  cardDetail: { fontSize: '0.9em', color: '#666', },
  dataSourceBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f0f4f7', padding: '15px 25px', borderRadius: '8px', marginBottom: '40px', },
  dataLeft: { display: 'flex', alignItems: 'center', gap: '5px', },
  flagIcon: { fontSize: '1.2em', },
  flagCount: { fontSize: '0.8em', color: '#666', marginLeft: '5px', },
  dataRight: { textAlign: 'right', },
  dataTitle: { fontSize: '1em', fontWeight: '600', color: '#333', },
  dataText: { fontSize: '0.9em', color: '#666', },
  photoSection: { paddingTop: '20px', },
  photoTitle: { fontSize: '1.8em', fontWeight: '700', color: '#333', marginBottom: '20px', textAlign: 'left', },
  photoGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', marginBottom: '20px',
  },
  photoWrapper: {
    position: 'relative', width: '100%', paddingBottom: '100%', height: 0, borderRadius: '5px', overflow: 'hidden', cursor: 'pointer',
  },
  photoImage: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px',
  },
  photoOverlayContainer: {
    position: 'relative', width: '100%', paddingBottom: '100%', height: 0, borderRadius: '5px', overflow: 'hidden', cursor: 'pointer',
  },
  overlayText: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white', fontSize: '1.8em', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', zIndex: 2,
  },
  showMoreButton: {
    width: '100%', padding: '12px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1em', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
  },
};

const fullscreenStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
  },
  image: {
    maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '8px', transition: 'opacity 0.3s',
  },
  closeButton: {
    position: 'absolute', top: '20px', right: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black',
    border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '1.2em', cursor: 'pointer',
    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1010,
  },
  navButton: {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', fontSize: '2em',
    cursor: 'pointer', zIndex: 1010, backdropFilter: 'blur(5px)',
  },
  counter: {
    position: 'absolute', bottom: '20px', color: 'white', fontSize: '1.1em', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 15px', borderRadius: '5px',
  }
};

export default Samplereport;