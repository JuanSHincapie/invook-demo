import {
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useGetSupplies } from "../../hooks/supply/useGetSupplies";
import SupplyHeader from "./SupplyHeader";
import SupplyTable from "./SupplyTable";
import SupplyFormDialog from "./SupplyFormDialog";
import type { Supply } from "../../model/Supply";

const MainSupply = () => {
  const navigate = useNavigate();
  const { 
    supplies, 
    loading, 
    error, 
    searchSupplies, 
    clearFilters,
    refetch 
  } = useGetSupplies();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);

  const handleEdit = useCallback(
    (code: string) => {
      const supplyToEdit = supplies.find((supply) => supply.code === code);
      if (supplyToEdit) {
        setSelectedSupply(supplyToEdit);
        setIsEditOpen(true);
      } else {
        console.error("Suministro no encontrado:", code);
      }
    },
    [supplies]
  );

  const handleDelete = useCallback(
    (code: string) => {
      const supplyToDelete = supplies.find((supply) => supply.code === code);
      if (supplyToDelete) {
        setSelectedSupply(supplyToDelete);
        setIsDeleteOpen(true);
      } else {
        console.error("Suministro no encontrado:", code);
      }
    },
    [supplies]
  );

  const handleAddNew = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleEditClose = useCallback(() => {
    setIsEditOpen(false);
    setSelectedSupply(null);
  }, []);

  const handleDeleteClose = useCallback(() => {
    setIsDeleteOpen(false);
    setSelectedSupply(null);
  }, []);

  const handleFormSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      searchSupplies(searchTerm);
    },
    [searchSupplies]
  );

  const handleClearFilters = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const handleBackToInventory = useCallback(() => {
    navigate("/inventory");
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
          <SupplyHeader
            onBack={handleBackToInventory}
            onAddNew={handleAddNew}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
            totalCount={supplies.length}
          />
        </Box>
        <Box
          sx={{
            maxHeight: "600px",
            overflow: "auto",
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            width: "100%",
          }}
        >
          <SupplyTable
            supplies={supplies}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
        <SupplyFormDialog
          open={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />

        {isEditOpen && (
          <Box sx={{ p: 2, bgcolor: "warning.light", borderRadius: 2, mt: 2 }}>
            <div>EditDialog: {selectedSupply?.name}</div>
            <button onClick={handleEditClose}>Cerrar</button>
          </Box>
        )}

        {isDeleteOpen && (
          <Box sx={{ p: 2, bgcolor: "error.light", borderRadius: 2, mt: 2 }}>
            <div>DeleteDialog: {selectedSupply?.name}</div>
            <button onClick={handleDeleteClose}>Cerrar</button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MainSupply;
