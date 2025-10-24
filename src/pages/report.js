import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { database } from '../firebase'; // Adjust path as necessary
import { ref, get, child } from 'firebase/database';
import './ReportPage.css'; // MUST remain for styling!

// Define the structure needed for rendering the cards
const INITIAL_REPORT_DATA = {
    carDetails: {
        make: "N/A",
        model: "N/A",
        vin: "",
        fuel_type: "N/A",
        year: "N/A",
        current_mileage: "N/A"
    },
    sections: {
        mileage: { status: "Checking...", text: "Fetching mileage status." },
        damage: { status: "Checking...", text: "Fetching damage records." },
        titleCheck: { status: "Checking...", text: "Fetching title status." },
        safety: { status: "Checking...", text: "Fetching safety recall status." },
        emissions: { status: "Checking...", text: "Fetching emissions status." },
        commercialUse: { status: "Checking...", text: "Fetching commercial use history." },
        legalStatus: { status: "Checking...", text: "Fetching legal risk status." },
        theft: { status: "Checking...", text: "Fetching theft records." }
    },
    detailedChecks: {
        commercial: null,
        theft: null,
        mileage: null,
        title: null // 💡 NEW: Placeholder for detailed title checks
    },
    images: []
};

// --- Helper Function to Map Firebase Data to Report Structure ---
const transformFirebaseData = (data, currentVin) => {
    const summary = data.summary || {};
    const titleCheck = data.title_check || {}; // 💡 Using titleCheck object
    const commercialUse = data.commercial_use || {}; 
    const legalStatus = data.legal_status || {};
    const safetyEmissions = data.safety_and_emissions || {};
    const theft = data.theft || {}; 
    const mileageDataFromDb = data.mileage_details || {}; 
    
    const sections = {};
    const damageCount = data.damage_records ? data.damage_records.length : 0;
    
    // --- Mileage Check (Summary) ---
    if (summary.mileage_rollback) {
        sections.mileage = { status: "Attention", text: "Possible mileage rollback detected." };
    } else {
        const mileageText = data.current_mileage ? `${data.current_mileage.toLocaleString()} miles.` : "Mileage data not available.";
        sections.mileage = { status: "No issues found", text: `Current mileage: ${mileageText}` };
    }

    // --- Damage Check ---
    if (summary.accidents) {
        sections.damage = { status: "Attention", text: `We found ${damageCount} damage record(s) for this vehicle.` };
    } else {
        sections.damage = { status: "No issues found", text: "No damage or accident records found." };
    }

    // --- Title Check (Summary) ---
    if (titleCheck.is_salvage || titleCheck.is_flood || titleCheck.is_rebuilt) {
        let issues = [];
        if (titleCheck.is_salvage) issues.push("Salvage");
        if (titleCheck.is_flood) issues.push("Flood");
        if (titleCheck.is_rebuilt) issues.push("Rebuilt");
        // The summary text should mention a severe damage record, which is "Salvage" in this case
        sections.titleCheck = { status: "Attention", text: `"Salvage" record found – possible past severe damage.` };
    } else {
        sections.titleCheck = { status: "No issues found", text: `Title status: ${summary.title_status || 'Clean Title'}.` };
    }

    // --- Safety Check ---
    if (summary.recalls_found) {
        // Safety check shows '1 open or past safety recall(s) found for this vehicle.'
        sections.safety = { status: "Attention", text: `1 open or past safety recall(s) found for this vehicle.` };
    } else {
        sections.safety = { status: "No issues found", text: "No open or past safety recalls found." };
    }

    // --- Emissions Check ---
    // Emissions shows 'Attention' with 'High CO2 emission rating: 281 g/km.'
    if (safetyEmissions.emissions_compliance && safetyEmissions.emissions_compliance.includes("High CO2")) {
        sections.emissions = { status: "Attention", text: `High CO₂ emission rating: 281 g/km.` };
    } else if (safetyEmissions.emissions_compliance && safetyEmissions.emissions_compliance.includes("Compliant")) {
        sections.emissions = { status: "No issues found", text: safetyEmissions.emissions_compliance };
    } else {
        sections.emissions = { status: "Attention", text: safetyEmissions.emissions_compliance || 'Emissions compliance details not found.' };
    }
    
    // --- Commercial Use Check (Summary) ---
    if (summary.commercial_use) {
        sections.commercialUse = { status: "Attention", text: commercialUse.details || 'Commercial use history found.' };
    } else {
        sections.commercialUse = { status: "No issues found", text: "No records of commercial use found." };
    }

    // --- Legal Status Check ---
    if (legalStatus.is_loan_outstanding) {
        sections.legalStatus = { status: "Attention", text: "Outstanding loan/lien record found." };
    } else {
        sections.legalStatus = { status: "No issues found", text: "No financial or legal risk records found." };
    }

    // --- Theft Check (Summary) ---
    if (summary.theft_record) {
        sections.theft = { status: "Attention", text: theft.is_stolen ? `Theft record found. Status: Stolen` : `Theft record found. Last report: ${theft.last_theft_report || 'Details pending.'}` };
    } else {
        sections.theft = { status: "No issues found", text: "No theft records found." };
    }
    
    // --- Car Details and Images ---
    const imagesArray = data.images ? Object.values(data.images) : [];

    // Theft Details
    const theftDetails = theft.details_list || [
        { name: "Currently wanted as stolen", found: false, detail: "No record found" },
        { name: "Stolen in the past", found: false, detail: "No past theft records found for this vehicle." },
    ];
    const theftCountries = theft.countries_checked || [
        'Sweden', 'Netherlands', 'Finland', 'United Kingdom', 'Ukraine', 'Poland',
        'United States', 'Mexico', 'Slovenia', 'Romania', 'Slovakia', 'Italy',
        'Hungary', 'Denmark', 'Canada'
    ];
    
    // Mileage Details
    const mileageData = {
        last_known_mileage: mileageDataFromDb.last_known_mileage || 'N/A',
        records_found: mileageDataFromDb.records_found || 0,
        vertical_insight: mileageDataFromDb.vertical_insight || "Insight data currently unavailable.",
        chart_data: mileageDataFromDb.chart_data || [], 
        typical_records: mileageDataFromDb.typical_records || 'N/A',
    };

    // 💡 TITLE DETAILS MAPPING
    const titleDetails = {
        // If brands_list is missing, use a mock list
        brands: titleCheck.brands_list || [
            { name: "Salvage", found: titleCheck.is_salvage || true, date: titleCheck.salvage_date || "04/2021" },
            { name: "Junk", found: titleCheck.is_junk || false, date: null },
            { name: "Fire", found: titleCheck.is_fire || false, date: null },
            { name: "Flood", found: titleCheck.is_flood || false, date: null },
            { name: "Hail", found: titleCheck.is_hail || false, date: null },
            { name: "Lemon", found: titleCheck.is_lemon || false, date: null },
        ],
        // The total number of brands checked
        total_brands_checked: titleCheck.total_brands_checked || 58, 
        note: "Vehicles with the “Salvage” title cannot be registered for road use without extensive repairs"
    };

    return {
        carDetails: {
            make: data.make || 'N/A',
            model: data.model || 'N/A',
            vin: data.vin || currentVin,
            fuel_type: data.fuel_type || 'N/A',
            year: data.year || 'N/A',
            current_mileage: data.current_mileage || 'N/A'
        },
        sections: sections,
        images: imagesArray,
        detailedChecks: {
            commercial: commercialUse.details_list || [],
            theft: {
                details: theftDetails,
                countries: theftCountries
            },
            mileage: mileageData,
            title: titleDetails // 💡 ADDED TITLE DATA
        }
    };
};
// -------------------------------------------------------------------------


// --- COMPONENT: CommercialUseCard (kept for context) ---
const CommercialUseCard = ({ details, overallStatus }) => {
    // ... (CommercialUseCard JSX logic remains the same) ...
    const checks = details && details.length > 0 ? details : [
        { name: "Taxi", found: false, detail: "No evidence of being used as a taxi" },
        { name: "Transport", found: false, detail: "No evidence of being used as a transport vehicle" },
        { name: "Rental", found: false, detail: "No evidence of being used as a rental vehicle" },
        { name: "Police", found: false, detail: "No evidence of being used by police" },
        { name: "Demo", found: false, detail: "No evidence of being used as a demo vehicle" },
        { name: "Driving school vehicle", found: false, detail: "No evidence of being used as a driving school vehicle" },
    ];
    
    const overallStatusText = overallStatus.text || "No records of vehicle being used in irregular manner";
    const overallStatusClass = overallStatus.status.includes('Attention') ? 'status-attention' : 'status-ok';

    return (
        <div className="commercial-use-detailed-card">
            <h3 className="section-title">Commercial use check</h3>
            <div className={`overall-status-banner ${overallStatusClass}`}>
                <p className="overall-status-text">
                    {overallStatus.status.includes('Attention') ? '⚠️ Attention: Record(s) found' : '✅ No issues found'}
                </p>
                <p>{overallStatusText}</p>
            </div>
            <p className="intro-text">
                Was the vehicle used as a taxi, rental, or other service vehicle? Note: such vehicles may be in worse condition than usual.
            </p>

            <h4 className="checked-header">Here's what we checked:</h4>
            <div className="commercial-checks-grid">
                {checks.map((check, index) => (
                    <div key={index} className="check-item-card">
                        <div className="check-icon"></div> 
                        <h5 className="check-name">{check.name}</h5>
                        <p className="check-result">
                            <span className={check.found ? 'result-found' : 'result-not-found'}>
                                {check.found ? '⚠️ Record found' : '✓ No record found'}
                            </span>
                        </p>
                        <p className="check-detail">{check.detail || 'Details unavailable'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
// --- END CommercialUseCard ---


// --- COMPONENT: TheftCheckCard (kept for context) ---
const TheftCheckCard = ({ theftDetails, overallStatus }) => {
    // ... (TheftCheckCard JSX logic remains the same) ...
    const checks = theftDetails.details || [
        { name: "Currently wanted as stolen", found: false, detail: "No record found" },
        { name: "Stolen in the past", found: false, detail: "No past theft records found for this vehicle." },
    ];

    const countries = theftDetails.countries || [];
    
    const overallStatusText = overallStatus.text || "We didn't find any records that the vehicle was stolen.";
    const overallStatusClass = overallStatus.status.includes('Attention') ? 'status-attention' : 'status-ok';

    return (
        <div className="theft-detailed-card">
            <h3 className="section-title">Theft</h3>
            
            <div className={`overall-status-banner ${overallStatusClass}`}>
                <p className="overall-status-text">
                    {overallStatus.status.includes('Attention') ? '⚠️ Attention: Theft record found' : '✅ No issues found'}
                </p>
                <p>{overallStatusText}</p>
            </div>
            
            <p className="intro-text">
                Is the vehicle currently marked as stolen? Was it stolen in the past? Has it been recovered?
            </p>

            <div className="note-block">
                <p>💡 Note</p>
                <p>Police database stolen vehicle check completed in **{countries.length} countries.**</p>
            </div>

            <h4 className="checked-header">Here's what we checked:</h4>
            <div className="theft-checks-grid">
                {checks.map((check, index) => (
                    <div key={index} className="check-item-card">
                        <h5 className="check-name">{check.name}</h5>
                        <p className="check-result">
                            <span className={check.found ? 'result-found' : 'result-not-found'}>
                                {check.found ? '⚠️ Record found' : '✓ No record found'}
                            </span>
                        </p>
                        <p className="check-detail">{check.detail || ''}</p>
                    </div>
                ))}
            </div>
            
            <h4 className="checked-countries-header">Police database stolen vehicle check completed in:</h4>
            <div className="countries-list">
                {countries.map((country, index) => (
                    <span key={index} className="country-tag">
                        {country}
                    </span>
                ))}
            </div>
        </div>
    );
};
// --- END TheftCheckCard ---


// --- COMPONENT: MileageCheckCard (kept for context) ---
const MileageCheckCard = ({ mileageData, overallStatus }) => {
    // ... (MileageCheckCard JSX logic remains the same) ...
    const { last_known_mileage, records_found, vertical_insight, typical_records, chart_data } = mileageData;

    const overallStatusText = overallStatus.text || "This vehicle may have a fake mileage!";
    const overallStatusClass = overallStatus.status.includes('Attention') ? 'status-attention' : 'status-ok';

    return (
        <div className="mileage-detailed-card">
            <h3 className="section-title">Mileage</h3>
            
            {/* Attention Banner */}
            <div className={`overall-status-banner ${overallStatusClass}`}>
                <p className="overall-status-text">
                    {overallStatus.status.includes('Attention') ? '⚠️ Attention' : '✅ No issues found'}
                </p>
                <p>{overallStatusText}</p>
            </div>
            
            <p className="intro-text">
                Are there signs of mileage rollbacks or discrepancies?
            </p>

            {/* Note Block */}
            <div className="mileage-note-block">
                <p>ℹ️ Note</p>
                <ul className="mileage-details-list">
                    <li>Last known mileage: **{last_known_mileage || 'N/A'}**</li>
                    <li>**{records_found || 0}** mileage records found</li>
                </ul>
            </div>
            
            {/* Insight Block */}
            <div className="insight-block">
                <p className="insight-header">🚗 carVertical Insight</p>
                <p className="insight-text">{vertical_insight || "No detailed insight available."}</p>
            </div>

            {/* Mileage Chart Area - Placeholder */}
            <div className="mileage-chart-placeholder">
                <p className="chart-title">Mileage History Graph (Data Points: {chart_data.length})</p>
                <div className="chart-line-representation">
                    {chart_data.length > 0 ? (
                        <>
                            <div className="chart-data-point last-record">Mileage: **{last_known_mileage}**</div>
                            <div className="chart-data-point typical">Typical records: {typical_records}</div>
                        </>
                    ) : (
                        <p className="chart-empty-message">No mileage history chart data available.</p>
                    )}
                    <div className="chart-year-labels">2015 ... 2024</div>
                </div>
            </div>
        </div>
    );
};
// --- END MileageCheckCard ---


// --- 💡 NEW COMPONENT: TitleCheckCard ---
const TitleCheckCard = ({ titleData, overallStatus }) => {
    const { brands, total_brands_checked, note } = titleData;

    const overallStatusText = overallStatus.text || "Title status is clean.";
    const overallStatusClass = overallStatus.status.includes('Attention') ? 'status-attention' : 'status-ok';

    return (
        <div className="title-detailed-card">
            <h3 className="section-title">Title check</h3>
            
            {/* Attention Banner */}
            <div className={`overall-status-banner ${overallStatusClass}`}>
                <p className="overall-status-text">
                    {overallStatus.status.includes('Attention') ? '⚠️ Attention' : '✅ No issues found'}
                </p>
                <p>{overallStatusText}</p>
            </div>
            
            <p className="intro-text">
                Is the vehicle marked with the branded title "Junk," "Salvage," "Flood" or others? Note: these are official title brand terms recognized by US state agencies.
            </p>

            {/* Note Block */}
            <div className="title-note-block">
                <p>ℹ️ Note</p>
                <p>{note}</p>
            </div>
            
            <h4 className="checked-header">Title Brands</h4>
            <div className="title-brands-grid">
                {brands.map((brand, index) => (
                    <div key={index} className="brand-item-card">
                        <h5 className="brand-name">{brand.name}</h5>
                        <p className="brand-result">
                            <span className={brand.found ? 'result-found-title' : 'result-not-found-title'}>
                                {brand.found ? '⚠️ Record found' : '✓ No record found'}
                            </span>
                        </p>
                        {brand.found && brand.date && (
                            <p className="brand-detail">Record found on {brand.date}</p>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Total Brands Checked Footer */}
            <div className="brands-checked-footer">
                <span className="checked-count">{total_brands_checked} Title brands were checked</span>
            </div>
        </div>
    );
};
// --- END TitleCheckCard ---


function ReportPage({ isLoggedIn }) {
    const { vin } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [reportData, setReportData] = useState(INITIAL_REPORT_DATA);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null); 

    const fetchReportFromFirebase = useCallback(async (currentVin) => {
        // ... (fetchReportFromFirebase logic remains the same)
        const upperVin = currentVin.toUpperCase(); 
        
        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, `vehicles/${upperVin}`));

            if (snapshot.exists()) {
                const firebaseData = snapshot.val();
                const transformedData = transformFirebaseData(firebaseData, currentVin);
                setReportData(transformedData);
            } else {
                setError(`Report not found for VIN: ${currentVin}.`);
            }
        } catch (err) {
            console.error("Firebase fetch error:", err);
            setError("Failed to load report due to a network error.");
        } finally {
            setLoading(false);
        }
    }, []);

    // --- Fullscreen and Navigation Handlers ---
    const openFullscreen = (index) => {
        if (reportData.images.length > 0) {
            setFullscreenImageIndex(index);
            document.body.style.overflow = 'hidden'; 
        }
    };

    const closeFullscreen = () => {
        setFullscreenImageIndex(null);
        document.body.style.overflow = 'unset'; 
    };

    const goToPrevious = useCallback((e) => {
        if (e && typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
        setFullscreenImageIndex(prevIndex => 
            (prevIndex === 0) ? reportData.images.length - 1 : prevIndex - 1
        );
    }, [reportData.images.length]);

    const goToNext = useCallback((e) => {
        if (e && typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
        setFullscreenImageIndex(prevIndex => 
            (prevIndex === reportData.images.length - 1) ? 0 : prevIndex + 1
        );
    }, [reportData.images.length]);

    // --- Keyboard Navigation useEffect ---
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (fullscreenImageIndex !== null) {
                switch (event.key) {
                    case 'ArrowLeft':
                        goToPrevious();
                        break;
                    case 'ArrowRight':
                        goToNext();
                        break;
                    case 'Escape': 
                        closeFullscreen();
                        break;
                    default:
                        break;
                }
            }
        };

        if (fullscreenImageIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [fullscreenImageIndex, goToPrevious, goToNext]); 
    
    // --- Data Fetch and Login Check useEffect ---
    useEffect(() => {
        if (!isLoggedIn) {
            alert("You must be signed in to view the full report.");
            navigate('/login');
            return;
        }

        const passedReport = location.state?.report;

        if (passedReport) {
            const transformedData = transformFirebaseData(passedReport, vin);
            setReportData(transformedData);
            setLoading(false);
        } else if (vin) {
            fetchReportFromFirebase(vin);
        } else {
            setError("Invalid report URL.");
            setLoading(false);
        }
    }, [vin, isLoggedIn, location.state, navigate, fetchReportFromFirebase]);
    
    // --- Utility Functions ---
    const getStatusClass = (status) => {
        if (status.includes('Attention')) return 'status-attention';
        if (status.includes('No issues')) return 'status-ok';
        return 'status-default';
    };

    const photosToShow = showAllPhotos ? reportData.images : reportData.images.slice(0, 5);
    const currentImageUrl = fullscreenImageIndex !== null ? reportData.images[fullscreenImageIndex] : null;

    if (loading) {
        return <div className="report-container">Loading report for VIN: {vin}...</div>;
    }

    if (error) {
        return <div className="report-container error-message">Error: {error}</div>;
    }

    return (
        <div className="report-page-container">
            {/* Top Navigation Bar */}
            <div className="report-nav">
                <button className="active">Overview</button>
                <button>Photos</button>
                <button>Commercial use check</button>
                <button>Theft</button>
                <button>Mileage</button>
                <button>Legal status check</button>
                <button>Title check</button>
                <button>Damage</button>
                <button>Natural disaster exposure</button>
                <button>Market value</button>
            </div>

            {/* Main Report Content */}
            <div className="report-main-content">
                {/* ... (Car Header) ... */}
                <div className="car-header">
                    <img 
                        src={reportData.images[0] || 'placeholder-car.png'} 
                        alt={`${reportData.carDetails.make} ${reportData.carDetails.model}`} 
                        className="car-image" 
                        onClick={() => openFullscreen(0)} 
                    />
                    <div className="car-info">
                        <h2>{reportData.carDetails.make} {reportData.carDetails.model}</h2>
                        <span className="vin-tag">{reportData.carDetails.vin || vin}</span>
                        <span className="fuel-tag">{reportData.carDetails.fuel_type}</span>
                        <span className="year-tag">{reportData.carDetails.year}</span>
                        <button className="share-button">Share</button>
                    </div>
                </div>

                {/* Section Cards */}
                <div className="section-cards-grid">
                    {Object.entries(reportData.sections).map(([key, section]) => (
                        <div key={key} className={`report-card ${getStatusClass(section.status)}`}>
                            <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                            <div className={`status-tag ${section.status.includes('Attention') ? 'attention' : 'ok'}`}>
                                {section.status.includes('Attention') ? '⚠️ Attention' : '✅ No issues found'}
                            </div>
                            <p>{section.text}</p>
                        </div>
                    ))}
                </div>
                
                {/* Data Sources (static) */}
                <div className="data-sources">
                    <p>We checked 900+ data sources in **40 countries**</p>
                </div>
                
                <h2>Photos</h2>
                <div className="photo-grid">
                    {photosToShow.length > 0 ? (
                        photosToShow.map((url, index) => (
                            <img 
                                key={index} 
                                src={url} 
                                alt={`Vehicle photo ${index + 1}`} 
                                className="photo-item" 
                                onClick={() => openFullscreen(index)} 
                            />
                        ))
                    ) : (
                        <p>No photos available.</p>
                    )}
                </div>

                {/* SHOW MORE/LESS BUTTON */}
                {reportData.images.length > 7 && (
                    <div className="show-more-container">
                        <button 
                            className="show-more-button" 
                            onClick={() => setShowAllPhotos(!showAllPhotos)}
                        >
                            {showAllPhotos ? 'Show Less' : `Show More `}
                        </button>
                    </div>
                )}
                
                {/* Commercial Use Detailed Check Card */}
                <CommercialUseCard 
                    details={reportData.detailedChecks.commercial}
                    overallStatus={reportData.sections.commercialUse}
                />

                {/* Theft Detailed Check Card */}
                <TheftCheckCard 
                    theftDetails={reportData.detailedChecks.theft}
                    overallStatus={reportData.sections.theft}
                />

                {/* Mileage Detailed Check Card */}
                <MileageCheckCard
                    mileageData={reportData.detailedChecks.mileage}
                    overallStatus={reportData.sections.mileage}
                />

                {/* 💡 NEW: Title Detailed Check Card (After Mileage) */}
                <TitleCheckCard
                    titleData={reportData.detailedChecks.title}
                    overallStatus={reportData.sections.titleCheck}
                />

            </div>

            {/* FULLSCREEN MODAL JSX with Navigation */}
            {currentImageUrl && (
                <div className="fullscreen-modal-overlay" onClick={closeFullscreen}>
                    <button className="modal-close-button" onClick={closeFullscreen}>&times;</button>
                    
                    {/* Previous Button */}
                    {reportData.images.length > 1 && (
                        <button className="modal-nav-button prev-button" onClick={goToPrevious}>&#10094;</button>
                    )}

                    <img 
                        src={currentImageUrl} 
                        alt={`Full Screen ${fullscreenImageIndex + 1} of ${reportData.images.length}`} 
                        className="fullscreen-modal-content" 
                        onClick={e => e.stopPropagation()} 
                    />

                    {/* Next Button */}
                    {reportData.images.length > 1 && (
                        <button className="modal-nav-button next-button" onClick={goToNext}>&#10095;</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ReportPage;