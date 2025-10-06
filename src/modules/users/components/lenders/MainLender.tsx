import {
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useGetLenders } from "../../hook/useGetLenders";
import LenderHeader from "./LenderHeader";
import LenderTable from "./LenderTable";
import LenderPagination from "./LenderPagination";

const MainLender = () => {
  const navigate = useNavigate();
  const { 
    lenders, 
    loading, 
    error, 
    totalCount,
    currentPage,
    hasNext,
    hasPrevious,
    searchTerm,
    searchLenders,
    clearFilters,
    goToPage,
    nextPage,
    previousPage,
    loadAllPages
  } = useGetLenders();

  const handleSearch = useCallback(
    (searchTerm: string) => {
      searchLenders(searchTerm);
    },
    [searchLenders]
  );

  const handleClearFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const handleBackToUsers = useCallback(() => {
    navigate("/users");
  }, [navigate]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1600px", mx: "auto" }}>
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backgroundColor: "background.default",
            pb: 2,
            mb: 2,
          }}
        >
          <LenderHeader
            onBack={handleBackToUsers}
            onSearch={handleSearch}
            onClearSearch={handleClearFilters}
            onLoadAll={loadAllPages}
            totalCount={totalCount}
            currentPage={currentPage}
            showingCount={lenders.length}
            searchTerm={searchTerm}
          />
        </Box>
        
        <Box sx={{
          overflow: "auto",
          minHeight: "400px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <LenderTable
            lenders={lenders}
            loading={loading}
            error={error}
          />
          <LenderPagination
            currentPage={currentPage}
            totalCount={totalCount}
            showingCount={lenders.length}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            loading={loading}
            onPageChange={goToPage}
            onNextPage={nextPage}
            onPreviousPage={previousPage}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default MainLender;