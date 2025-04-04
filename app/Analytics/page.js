'use client'
import React, { useState } from 'react';
import styles from '../../styles/Analytics.module.css';
import { AiOutlineClose, AiOutlineInfoCircle, AiOutlineDown } from 'react-icons/ai';
import { BsCalendarDate, BsTag, BsFileEarmark, BsFolder } from 'react-icons/bs';
import Sidebar from '../components/Sidebar';

const Analytics = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState('horizon');

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
      contributorsCount: 2
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

  // Selected project details
  const projectDetails = {
    title: 'Project Horizon (2026)',
    summary: `The project was focused on providing strategic and investment advisory services to RetailFlow Systems, a prominent provider of retail supply chain cloud services, during its acquisition of SkyPilot Technologies. SkyPilot Technologies specializes in Amazon seller tools that support first-party (1P) and third-party (3P) offerings, providing solutions such as inventory forecasting, advertising support, fulfillment reimbursements, and 1P vendor cost recovery. These services are designed to enhance operational efficiency and maximize revenue for Amazon sellers, leveraging data analytics and AI-driven insights to improve profitability and scalability. The consulting firm's role was pivotal in assessing SkyPilot Technologies' value and growth potential, ultimately contributing to the successful acquisition announced on January 7, 2025.`,
    documents: [],
    collaborators: ['Cameron', 'Gray', 'Casey'],
    tags: ['RetailFlow Systems', 'SkyPilot Technologies', '#2026']
  };

  return (
    <div className={styles.pageContainer}>
    <Sidebar/>
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="What are some past deals we worked on in the cloud/IT providers space" />
          <button className={styles.clearButton}><AiOutlineClose /></button>
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
                  RetailFlow Systems during its acquisition of SkyPilot Technologies. SkyPilot...
                </li>
                {showMore && (
                  <>
                    <li>
                      <strong>Project Atlas:</strong> Advisory services for Aurora Partners during their evaluation of TeraGuard.
                    </li>
                    <li>
                      <strong>Project Aurora:</strong> Support for ArtemisOne in attracting strategic investors.
                    </li>
                    <li>
                      <strong>Project Orion:</strong> Advised HarborGate Investments on acquisition targets in security sector.
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
                      {/* This would be replaced with actual icons */}
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
                      {/* Avatar placeholders */}
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
              <div className={styles.documentsPlaceholder}>
                {/* Document list would go here */}
              </div>
              
              <div className={styles.collaboratorsSection}>
                <div className={styles.avatarGroup}>
                  {/* Avatar placeholders */}
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

export default Analytics;