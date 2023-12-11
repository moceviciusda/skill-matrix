import { useParams } from 'react-router-dom';
import MatrixBuilder from '../components/matrixBuilder/MatrixBuilder';
import { useGetMatricesQuery } from '../slices/matrixApiSlice';
import { useSelector } from 'react-redux';
import NavItem from '../components/navBar/NavItem';

const MatrixBuilderScreen = () => {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data, isFetching } = useGetMatricesQuery({ ownerId: userInfo._id });

  if (id) return <MatrixBuilder matrixId={id} />;
  else if (isFetching) return <>Loading...</>;
  else
    return (
      <ul>
        {data.map((matrix) => (
          <li key={matrix._id}>
            <NavItem to={`/builder/${matrix._id}`}>{matrix.name}</NavItem>
          </li>
        ))}
      </ul>
    );
};

export default MatrixBuilderScreen;
