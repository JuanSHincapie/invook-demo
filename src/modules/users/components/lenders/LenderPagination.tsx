import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

interface LenderPaginationProps {
  currentPage: number;
  totalCount: number;
  showingCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  loading: boolean;
  onPageChange?: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const LenderPagination = ({
  currentPage,
  totalCount,
  showingCount,
  hasNext,
  hasPrevious,
  loading,
  onNextPage,
  onPreviousPage,
}: LenderPaginationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderTop: "1px solid",
        borderColor: "grey.300",
        bgcolor: "grey.50",
        borderRadius: "0 0 8px 8px",
      }}
    >
      {/* Info de paginación */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando {showingCount} de {totalCount} prestamistas
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2" color="text.secondary">
              Cargando...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Controles de navegación */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          disabled={!hasPrevious || loading}
          onClick={onPreviousPage}
          startIcon={<ChevronLeftIcon />}
          sx={{ borderRadius: 2 }}
        >
          Anterior
        </Button>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#000", 
            minWidth: 100, 
            textAlign: "center",
            fontWeight: "medium"
          }}
        >
          Página {currentPage}
        </Typography>
        
        <Button
          variant="outlined"
          size="small"
          disabled={!hasNext || loading}
          onClick={onNextPage}
          endIcon={<ChevronRightIcon />}
          sx={{ borderRadius: 2 }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default LenderPagination;