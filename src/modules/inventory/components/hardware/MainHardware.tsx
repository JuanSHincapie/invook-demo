import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useGetHardware } from "../../hooks/hardware/useGetHardware";
import { HardwareHeader } from "./HardwareHeader";
import { HardwareTable } from "./HardwareTable";
import { HardwareFormDialog } from "./HardwareFormDialog";
import HardwareEditDialog from "./HardwareEditDialog";
import type { Hardware } from "../../model/Hardware";

const HardwarePage = () => {
  const navigate = useNavigate();
  const { hardware, loading, error, searchByType, clearFilters, refetch } =
    useGetHardware();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedHardware, setSelectedHardware] = useState<Hardware | null>(
    null
  );

  const handleEdit = useCallback(
    (serial: string) => {
      const hardwareToEdit = hardware.find((hw) => hw.serial === serial);
      if (hardwareToEdit) {
        setSelectedHardware(hardwareToEdit);
        setIsEditOpen(true);
      } else {
        console.error("Hardware no encontrado:", serial);
      }
    },
    [hardware]
  );

  const handleDelete = useCallback((serial: string) => {
    console.log("Eliminar equipo:", serial);
  }, []);

  const handleAddNew = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleEditClose = useCallback(() => {
    setIsEditOpen(false);
    setSelectedHardware(null);
  }, []);

  const handleFormSuccess = useCallback(
    (newHardware: Hardware) => {
      console.log("Hardware creado exitosamente:", newHardware);
      refetch();
    },
    [refetch]
  );

  const handleEditSuccess = useCallback(
    (updatedHardware: Hardware) => {
      console.log("Hardware actualizado exitosamente:", updatedHardware);
      refetch();
    },
    [refetch]
  );

  const handleSearch = useCallback(
    (searchTerm: string) => {
      searchByType(searchTerm);
    },
    [searchByType]
  );

  const handleClearSearch = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const handleBackToInventory = useCallback(() => {
    navigate("/inventory");
  }, [navigate]);

  return (
    <Container maxWidth="lg">
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
          <HardwareHeader
            onBack={handleBackToInventory}
            onAddNew={handleAddNew}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            totalCount={hardware.length}
          />
        </Box>
        <Box
          sx={{
            maxHeight: "600px",
            overflow: "auto",
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 2,
          }}
        >
          <HardwareTable
            hardware={hardware}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>

        <HardwareFormDialog
          open={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />

        <HardwareEditDialog
          open={isEditOpen}
          hardware={selectedHardware}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      </Box>
    </Container>
  );
};

export default HardwarePage;
