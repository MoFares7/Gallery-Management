"use client";
import CategoryCard from "@/components/cards/CategoryCard";
import PageHeader from "@/components/header/PageHeader";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { Box, Container, Grid } from "@mui/material";
import { useCategoriesHome } from "../../_hooks/useCategoriesHome";
import AddEditCategory from "../add-edit/AddEditCategory";
import HandleStatusSection from "@/components/handles/HandleStateSection";

export default function HomeCategories() {
  const {
    categories,
    isLoading,
    error,
    formOpen,
    setFormOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedCategory,
    setSelectedCategory,
    handleCreate,
    handleEdit,
    handleDelete,
    handleView,
    handleFormSubmit,
    handleConfirmDelete,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCategoriesHome();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        background: "background.gradient",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 16, pb: 8 }}>
        <PageHeader
          title="Categories"
          buttonText="Create Category"
          onClick={handleCreate}
        />

        {isLoading ? (
          <HandleStatusSection type="loading" />
        ) : error ? (
          <HandleStatusSection type="error" />
        ) : (
          <Grid container spacing={3}>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Grid
                  size={{ xs: 6, sm: 4, md: 3, lg: 2.2, xl: 2 }}
                  key={category.id}
                >
                  <CategoryCard
                    category={category}
                    onClick={() => handleView(category)}
                    onClickEdit={() => handleEdit(category)}
                    onClickDelete={() => handleDelete(category)}
                    isAbleAction={true}
                  />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <HandleStatusSection type="empty" />
              </Grid>
            )}
          </Grid>
        )}

        <AddEditCategory
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setSelectedCategory(undefined);
          }}
          onSubmit={handleFormSubmit}
          category={selectedCategory}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedCategory(undefined);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Category"
          message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
          isLoading={deleteMutation.isPending}
        />
      </Container>
    </Box>
  );
}
