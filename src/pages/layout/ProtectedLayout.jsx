import FullLayout from "layouts/full/FullLayout";

const { useSelector } = require( "react-redux" );
const { Navigate, useLocation } = require( "react-router-dom" );


export const ProtectedLayout = () => {
  const user = useSelector( ( state ) => state.global.user );
  // const { status, data } = useGetUserQuery(user?._id);
  const location = useLocation();

  // console.log('api user: ', data);

  if ( !user ) {
    // user is not authenticated
    return <Navigate to={`/auth/login?from=${location.pathname}`} />;
  }

  return <FullLayout />;
};

export default ProtectedLayout;
