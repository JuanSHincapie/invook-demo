import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  GetApp as GetAppIcon,
} from "@mui/icons-material";

interface LenderHeaderProps {
  onBack: () => void;
  onSearch?: (searchTerm: string) => void;
  onClearSearch?: () => void;
  onLoadAll?: () => void;
  totalCount: number;
  currentPage: number;
  showingCount: number;
  searchTerm?: string;
}

const LenderHeader = ({
  onBack,
  onSearch,
  onClearSearch,
  onLoadAll,
  totalCount,
  currentPage,
  showingCount,
  searchTerm = "",
}: LenderHeaderProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
  };

  return (
    <>
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
            onClick={onBack}
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
        borderColor: "grey.300",
        gap: 2
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          <Box>
            <Typography variant="body2" sx={{ color: "#000", fontWeight: "medium" }}>
              Total de prestamistas: {totalCount}
            </Typography>
          </Box>
          
          {/* Búsqueda */}
          {onSearch && (
            <TextField
              size="small"
              placeholder="Buscar prestamistas..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ minWidth: 250 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={handleClearSearch}
                        sx={{ minWidth: "auto", p: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </Button>
                    </InputAdornment>
                  ),
                }
              }}
            />
          )}
          
          {/* Chip de filtro activo */}
          {searchTerm && (
            <Chip
              label={`Buscando: "${searchTerm}"`}
              onDelete={handleClearSearch}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
        </Box>
        
        {/* Acciones */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {onLoadAll && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<GetAppIcon />}
              onClick={onLoadAll}
              sx={{ borderRadius: 2 }}
            >
              Cargar Todos
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LenderHeader;