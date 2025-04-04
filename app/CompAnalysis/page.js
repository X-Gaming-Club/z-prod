'use client'
import React, { useState } from 'react';
import styles from '../../styles/CompAnalysis.module.css';
import { AiOutlineClose, AiOutlineInfoCircle, AiOutlineDown } from 'react-icons/ai';
import { BsCalendarDate, BsTag, BsFileEarmark, BsFolder, BsSearch } from 'react-icons/bs';
import Sidebar from '../components/Sidebar';

const CompAnalysis = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState('horizon');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for the projects
  const projects = [
    {
      id: 'horizon',
      number: '#2026',
      title: 'Project Horizon',
      clients: ['RetailFlow Systems', 'SkyPilot Technologies'],
      date: 'Mar 2023 - Jul 2024',
      type: 'CDD',
      description: 'We provided advisory services to RetailFlow Systems during its acquisition of SkyPilot Technologies in the cloud space.',
      contributors: ['Cameron', 'Gray', 'Casey'],
      contributorsCount: 3
    },
    {
      id: 'atlas',
      number: '#2094',
      title: 'Project Atlas',
      clients: ['Aurora Partners', 'TeraGuard'],
      date: 'Sep 2023 - Mar 2024',
      type: 'CDD',
      description: 'We assisted Aurora Partners in evaluating TeraGuard, a cloud and IT service provider.',
      contributors: ['Morgan', 'Taylor', 'Alex'],
      contributorsCount: 3
    },
    {
      id: 'aurora',
      number: '#2900',
      title: 'Project Aurora',
      clients: ['ArtemisOne'],
      date: 'Mar 2022 - Jun 2022',
      type: 'VCDD',
      description: 'We supported ArtemisOne in a sell-side process to attract strategic investors.',
      contributors: ['Jamie', 'Robin'],
      contributorsCount: 2
    },
    {
      id: 'orion',
      number: '#7815',
      title: 'Project Orion',
      clients: ['HarborGate Investments', 'DefConEdge'],
      date: 'Jun 2021 - Dec 2021',
      type: 'CDD',
      description: 'We advised HarborGate Investments on potential acquisition targets in the security space.',
      contributors: ['Alex', 'Jordan', 'Taylor'],
      contributorsCount: 3
    }
  ];

  // Selected project details - dynamically set based on the selected project
  const getSelectedProjectDetails = () => {
    const project = projects.find(p => p.id === selectedProject);
    
    const projectDetailsMappings = {
      'horizon': {
        title: `${project.title} (${project.number})`,
        summary: `The project was focused on providing strategic and investment advisory services to RetailFlow Systems, a prominent provider of retail supply chain cloud services, during its acquisition of SkyPilot Technologies. SkyPilot Technologies specializes in Amazon seller tools that support first-party (1P) and third-party (3P) offerings, providing solutions such as inventory forecasting, advertising support, fulfillment reimbursements, and 1P vendor cost recovery. These services are designed to enhance operational efficiency and maximize revenue for Amazon sellers, leveraging data CompAnalysis and AI-driven insights to improve profitability and scalability. The consulting firm's role was pivotal in assessing SkyPilot Technologies' value and growth potential, ultimately contributing to the successful acquisition announced on January 7, 2025.`,
        documents: [
          { id: 1, title: 'Due Diligence Report.pdf', date: 'Jun 15, 2024' },
          { id: 2, title: 'Financial Analysis.xlsx', date: 'May 28, 2024' },
          { id: 3, title: 'Market Research Summary.pptx', date: 'Apr 10, 2024' },
        ],
        collaborators: project.contributors,
        tags: [...project.clients, project.number]
      },
      'atlas': {
        title: `${project.title} (${project.number})`,
        summary: `Project Atlas involved comprehensive commercial due diligence for Aurora Partners in their evaluation of TeraGuard, a mid-size cloud and IT service provider specializing in managed services, cloud migration, and cybersecurity solutions. The team conducted extensive market analysis, competitive positioning assessment, and customer satisfaction surveys across TeraGuard's key service offerings. The analysis revealed strong growth potential in the managed security services segment but identified integration challenges with Aurora's existing portfolio companies. The project recommended a structured post-acquisition integration plan with particular focus on retaining key technical talent and leveraging cross-selling opportunities.`,
        documents: [
          { id: 1, title: 'Technical Assessment.pdf', date: 'Feb 12, 2024' },
          { id: 2, title: 'Customer Survey Results.pptx', date: 'Jan 25, 2024' },
          { id: 3, title: 'Integration Roadmap.docx', date: 'Mar 01, 2024' },
        ],
        collaborators: project.contributors,
        tags: [...project.clients, project.number]
      },
      'aurora': {
        title: `${project.title} (${project.number})`,
        summary: `Project Aurora was a vendor commercial due diligence (VCDD) engagement supporting ArtemisOne in a sell-side process to attract strategic investors. ArtemisOne is a specialist in AI-driven CompAnalysis platforms for the financial services sector. Our team analyzed product-market fit, conducted competitive benchmarking, and validated the company's growth projections. The analysis highlighted ArtemisOne's unique positioning in the emerging field of explainable AI for risk assessment and compliance automation. The engagement culminated in preparing detailed investment materials that led to successful funding from three strategic investors, valuing the company at $175 million.`,
        documents: [
          { id: 1, title: 'Investment Memorandum.pdf', date: 'May 30, 2022' },
          { id: 2, title: 'Growth Projection Analysis.xlsx', date: 'Apr 22, 2022' },
        ],
        collaborators: project.contributors,
        tags: [...project.clients, project.number]
      },
      'orion': {
        title: `${project.title} (${project.number})`,
        summary: `In Project Orion, we advised HarborGate Investments on identifying and evaluating potential acquisition targets in the cybersecurity sector. The team developed a comprehensive target screening methodology, evaluating over 75 companies against criteria including technology differentiation, customer retention, and scalability. Special focus was placed on companies offering zero-trust security solutions and advanced threat detection capabilities. The project concluded with a shortlist of five high-potential acquisition targets, detailed valuation models, and preliminary integration assessments for each. HarborGate subsequently proceeded with the acquisition of DefConEdge, one of our recommended targets.`,
        documents: [
          { id: 1, title: 'Target Screening Database.xlsx', date: 'Oct 05, 2021' },
          { id: 2, title: 'Technology Assessment Report.pdf', date: 'Nov 18, 2021' },
          { id: 3, title: 'Valuation Models.xlsx', date: 'Dec 03, 2021' },
          { id: 4, title: 'Final Recommendations.pptx', date: 'Dec 10, 2021' },
        ],
        collaborators: project.contributors,
        tags: [...project.clients, project.number]
      }
    };
    
    return projectDetailsMappings[selectedProject];
  };

  const projectDetails = getSelectedProjectDetails();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="What are some past deals we worked on in the cloud/IT providers space" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className={styles.clearButton} onClick={handleClearSearch}>
              <AiOutlineClose />
            </button>
          </div>
          <div className={styles.filters}>
            <div className={styles.filter}>
              <BsCalendarDate />
              <span>Date</span>
              <AiOutlineDown />
            </div>
            <div className={styles.filter}>
              <BsTag />
              <span>Source</span>
              <AiOutlineDown />
            </div>
            <div className={styles.filter}>
              <BsFileEarmark />
              <span>File Type</span>
              <AiOutlineDown />
            </div>
            <div className={styles.filter}>
              <BsFolder />
              <span>Project</span>
              <AiOutlineDown />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.answerSection}>
              <div className={styles.sectionHeader}>
                <h2>Answer</h2>
                <AiOutlineInfoCircle className={styles.infoIcon} />
              </div>
              <div className={styles.answerContent}>
                <p>Kenley has worked on several deals in the cloud/IT providers space:</p>
                <ol>
                  <li>
                    <strong>Project Horizon:</strong> Kenley provided strategic and investment advisory services to 
                    RetailFlow Systems during its acquisition of SkyPilot Technologies. SkyPilot Technologies specializes in Amazon seller tools and cloud-based supply chain solutions.
                  </li>
                  {showMore && (
                    <>
                      <li>
                        <strong>Project Atlas:</strong> Advisory services for Aurora Partners during their evaluation of TeraGuard, a cloud and IT service provider focused on managed services and cybersecurity solutions.
                      </li>
                      <li>
                        <strong>Project Aurora:</strong> Support for ArtemisOne, an AI-driven CompAnalysis platform provider, in attracting strategic investors for their cloud-based financial services solutions.
                      </li>
                      <li>
                        <strong>Project Orion:</strong> Advised HarborGate Investments on acquisition targets in the security sector, resulting in the acquisition of DefConEdge, a cloud security provider.
                      </li>
                    </>
                  )}
                </ol>
                <button 
                  className={styles.showMoreButton} 
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'Show less' : 'Show more'}
                  <AiOutlineDown className={showMore ? styles.rotateIcon : ''} />
                </button>
              </div>
            </div>

            <div className={styles.projectsSection}>
              <div className={styles.sectionHeader}>
                <h2>Projects</h2>
                <AiOutlineInfoCircle className={styles.infoIcon} />
              </div>
              <div className={styles.projectCards}>
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    className={`${styles.projectCard} ${selectedProject === project.id ? styles.selectedCard : ''}`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className={styles.projectHeader}>
                      <div>
                        <h3>{project.title}</h3>
                        <span className={styles.projectNumber}>{project.number}</span>
                      </div>
                      <div className={styles.projectIcon}>
                        <div className={styles.iconPlaceholder}></div>
                      </div>
                    </div>
                    
                    <div className={styles.clientRow}>
                      {project.clients.map((client, index) => (
                        <div key={index} className={styles.clientItem}>
                          <span className={styles.clientIcon}></span>
                          <span>{client}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.dateRow}>
                      <span className={styles.dateIcon}></span>
                      <span>{project.date}</span>
                      <span className={styles.projectType}>{project.type}</span>
                    </div>
                    
                    <div className={styles.descriptionRow}>
                      <p>{project.description}</p>
                    </div>
                    
                    <div className={styles.contributorsRow}>
                      <span>{project.contributors[0]} and {project.contributorsCount - 1} others contributed</span>
                      <div className={styles.avatarGroup}>
                        {project.contributors.slice(0, 3).map((contributor, index) => (
                          <div key={index} className={styles.avatar}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.projectDetailsSection}>
              <div className={styles.detailsHeader}>
                <h2>{projectDetails.title}</h2>
                <button className={styles.closeButton}><AiOutlineClose /></button>
              </div>
              
              <div className={styles.detailsContent}>
                <h3>Summary</h3>
                <p>{projectDetails.summary}</p>
                
                <h3>Documents</h3>
                {projectDetails.documents.length > 0 ? (
                  <div className={styles.documentsList}>
                    {projectDetails.documents.map(doc => (
                      <div key={doc.id} className={styles.documentItem}>
                        <div className={styles.documentIcon}>
                          <BsFileEarmark />
                        </div>
                        <div className={styles.documentInfo}>
                          <span className={styles.documentTitle}>{doc.title}</span>
                          <span className={styles.documentDate}>{doc.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.documentsPlaceholder}>
                    No documents available
                  </div>
                )}
                
                <div className={styles.collaboratorsSection}>
                  <div className={styles.avatarGroup}>
                    {projectDetails.collaborators.map((collaborator, index) => (
                      <div key={index} className={styles.avatar}></div>
                    ))}
                  </div>
                  <p>{projectDetails.collaborators.join(', ')} collaborated on this project</p>
                </div>
                
                <div className={styles.tagsSection}>
                  {projectDetails.tags.map((tag, index) => (
                    <div key={index} className={styles.tag}>
                      <span className={styles.tagIcon}></span>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompAnalysis;