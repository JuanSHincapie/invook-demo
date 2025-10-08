import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import LoanTable from "./LoanTable";
import LoanDetailDialog from "./LoanDetailDialog";
import LoanHeader from "./LoanHeader";
import { useGetLoanData } from "../../hook/useGetLoanData";
import { useResourceNavigation } from "../../hook/useResourceNavigation";
import type { Loan } from "../../model/Loan";

const MainLoan = () => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { navigateToMain } = useResourceNavigation();

  const { 
    data: loans, 
    loading, 
    error, 
    searchTerm, 
    totalCount,
    refetch, 
    searchLoans, 
    clearSearch 
  } = useGetLoanData();

  const handleViewDetails = (loan: Loan) => {
    setSelectedLoan(loan);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedLoan(null);
  };

  const handleAddNew = () => {
    console.log("Agregar nuevo préstamo");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Box>
        <LoanHeader
          onBack={navigateToMain}
          onAddNew={handleAddNew}
          onSearch={searchLoans}
          onClearSearch={clearSearch}
          onRefresh={refetch}
          totalCount={totalCount}
          showingCount={loans.length}
          searchTerm={searchTerm}
          loading={loading}
        />
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Paper
          sx={{
            borderRadius: '0 0 8px 8px',
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <LoanTable
            loans={loans || []}
            loading={loading}
            error={error}
            onViewDetails={handleViewDetails}
          />
        </Paper>
        <LoanDetailDialog
          open={detailDialogOpen}
          onClose={handleCloseDetailDialog}
          loan={selectedLoan}
        />
      </Box>
    </Container>
  );
};

export default MainLoan;