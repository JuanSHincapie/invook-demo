import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useGetLenders } from "../../hook/useGetLenders";
import LenderTable from "./LenderTable";

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
    nextPage,
    previousPage,
  } = useGetLenders();

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
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            mb: 2 
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBackToUsers}
                sx={{ borderRadius: 2 }}
              >
                Volver a Usuarios
              </Button>
              <Typography variant="h4" sx={{ color: "#000", fontWeight: "bold" }}>
                Gestión de Prestamistas
              </Typography>
            </Box>
          </Box>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            p: 2,
            bgcolor: "grey.50",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.300"
          }}>
            <Box>
              <Typography variant="body2" sx={{ color: "#000", fontWeight: "medium" }}>
                Total de prestamistas: {totalCount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="outlined"
                size="small"
                disabled={!hasPrevious || loading}
                onClick={previousPage}
              >
                Anterior
              </Button>
              <Typography variant="body2" sx={{ color: "#000", minWidth: 100, textAlign: "center" }}>
                Página {currentPage}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                disabled={!hasNext || loading}
                onClick={nextPage}
              >
                Siguiente
              </Button>
            </Box>
          </Box>
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
        </Box>
      </Box>
    </Container>
  );
};

export default MainLender;