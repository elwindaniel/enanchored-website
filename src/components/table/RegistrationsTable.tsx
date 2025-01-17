import React, { useState, useMemo } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; // Import icons
import styles from '@/styles/RegistrationsTable.module.css';

interface Registration {
  _id: string;
  firstName: string;
  surName: string;
  place: string;
  email: string;
  phoneNumber: string;
  age: string;
  church: string;
  occupation: string;
  foodAllergy: string; // Added field for food allergy
  allergyNote?: string; // Optional field for allergy note
  photographyConsent: string; // Added field for photography consent
}

interface RegistrationsTableProps {
  registrations: Registration[];
  onDelete: (id: string) => void;
  onEdit: (registration: Registration) => void;
}

const RegistrationsTable: React.FC<RegistrationsTableProps> = ({ registrations, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Registration;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>('');
  const [allergyGroupFilter, setAllergyGroupFilter] = useState<string>('');
  const [photographyConsentFilter, setPhotographyConsentFilter] = useState<string>(''); // New state for photographyConsent filter

  const itemsPerPage = 10;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key: keyof Registration) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleAgeGroupFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeGroupFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleAllergyGroupFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAllergyGroupFilter(event.target.value);
    setCurrentPage(1);
  };

  const handlePhotographyConsentFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPhotographyConsentFilter(event.target.value); // Handle change for photography consent filter
    setCurrentPage(1);
  };

  const sortedRegistrations = useMemo(() => {
    let sortableRegistrations = [...registrations];

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      sortableRegistrations = sortableRegistrations.filter((reg) =>
        Object.values(reg).some((value) => {
          if (value !== null && value !== undefined) {
            return value.toString().toLowerCase().includes(lowercasedTerm);
          }
          return false;
        })
      );
    }

    // Filter by age group
    if (ageGroupFilter) {
      sortableRegistrations = sortableRegistrations.filter((reg) => {
        const age = parseInt(reg.age, 10);
        if (ageGroupFilter === '13-18' && age >= 13 && age <= 18) return true;
        if (ageGroupFilter === '19-24' && age >= 19 && age <= 24) return true;
        if (ageGroupFilter === '25-30' && age >= 25 && age <= 30) return true;
        if (ageGroupFilter === '30+' && age >= 31) return true;
        return false;
      });
    }

    // Filter by food allergy
    if (allergyGroupFilter) {
      sortableRegistrations = sortableRegistrations.filter((reg) => {
        const foodAllergy = reg.foodAllergy;
        if (allergyGroupFilter === 'Yes' && foodAllergy === 'Yes') return true;
        if (allergyGroupFilter === 'No' && foodAllergy === 'No') return true;
        return false;
      });
    }

    // Filter by photography consent
    if (photographyConsentFilter) {
      sortableRegistrations = sortableRegistrations.filter((reg) => {
        const photographyConsent = reg.photographyConsent;
        if (photographyConsentFilter === 'Yes' && photographyConsent === 'Yes') return true;
        if (photographyConsentFilter === 'No' && photographyConsent === 'No') return true;
        return false;
      });
    }

    // Sort by selected column
    if (sortConfig !== null) {
      sortableRegistrations.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableRegistrations;
  }, [registrations, sortConfig, searchTerm, ageGroupFilter, allergyGroupFilter, photographyConsentFilter]);

  const totalItems = sortedRegistrations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = sortedRegistrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.registerContent}>
      <div className={styles.registerHeader}>
  {/* Registrations Count */}
  <div className={styles.logoText}>
            <span className={styles.AdminTileIconBlock}>{totalItems}</span> Registrations
          </div>

  {/* Filter Section */}
  <div className={styles.filters}>
    {/* Age Group Filter */}
    <select
      value={ageGroupFilter}
      onChange={handleAgeGroupFilterChange}
      className={styles.input}
    >
      <option value="">All Ages</option>
      <option value="13-18">13-18</option>
      <option value="19-24">19-24</option>
      <option value="25-30">25-30</option>
      <option value="30+">30+</option>
    </select>

    {/* Allergy Group Filter */}
    <select
      value={allergyGroupFilter}
      onChange={handleAllergyGroupFilterChange}
      className={styles.input}
    >
      <option value="">Allergy</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>

    {/* Photography Consent Filter */}
    <select
      value={photographyConsentFilter}
      onChange={handlePhotographyConsentFilterChange}
      className={styles.input}
    >
      <option value="">Photography Consent</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>

  {/* Search Input */}
  <div className={styles.searchWrapper}>
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
      className={styles.input}
    />
  </div>
</div>


        {/* Mobile/Card View */}
        <div className={styles.cardsWrapper}>
          {currentItems.map((reg) => (
            <div key={reg._id} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Name</div>
                <div className={styles.cardValue}>
                  {reg.firstName} {reg.surName}
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Place</div>
                <div className={styles.cardValue}>{reg.place}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Age</div>
                <div className={styles.cardValue}>{reg.age}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Church</div>
                <div className={styles.cardValue}>{reg.church}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Occupation</div>
                <div className={styles.cardValue}>{reg.occupation}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Phone</div>
                <div className={styles.cardValue}>{reg.phoneNumber}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Email</div>
                <div className={styles.cardValue}>{reg.email}</div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Food Allergy</div>
                <div className={styles.cardValue}>
                  {reg.foodAllergy}
                  <br />
                  {reg?.allergyNote}
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardLabel}>Photography Consent</div>
                <div className={styles.cardValue}>{reg?.photographyConsent}</div>
              </div>

              {/* Action Buttons */}
              <div className={styles.cardActions}>
                <button
                  onClick={() => onEdit(reg)}
                  className={`${styles.actionButton} ${styles.editButton}`}
                  aria-label="Edit"
                >
                  <AiFillEdit size={15} />
                </button>
                {/* <button
                  onClick={() => onDelete(reg._id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  aria-label="Delete"
                >
                  <AiFillDelete size={20} />
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className={styles.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`${styles.paginationButton} ${
                currentPage === index + 1 ? styles.activePage : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationsTable;
