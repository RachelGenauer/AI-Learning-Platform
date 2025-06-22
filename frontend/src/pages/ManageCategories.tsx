import { Container } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import  PageTitle  from '../components/PageTitle';
import { CategoriesLayout } from '../features/categories/CategoriesLayout';
import BackButton from '../components/BackButton';

export default function ManageCategories() {
  return (
    <Container maxWidth="md" sx={{ fontFamily: 'Amatic SC', mt: 5 }}>
      <BackButton href="/admin" text="Return to the admin dashboard" />

      <PageTitle icon={<FolderIcon />} title="Categories and Subcategories" />

      <CategoriesLayout />
    </Container>
  );
}
