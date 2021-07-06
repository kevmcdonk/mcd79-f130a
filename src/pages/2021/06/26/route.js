import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import _ from 'lodash';

export default function ResolveRoute() {
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
console.log(router.asPath);
console.log('that was the pathname in useEffect');
    if (pathname !== pathname.toLowerCase()) {
      router.push(pathname.toLowerCase())
    }
  },[router])

  const { pathname } = router;
  console.log(router.asPath);
  console.log('that was the pathname');
  if (pathname !== pathname.toLowerCase()) {
    return <Error statusCode={403} />
  }
  const componentName = _.get(this.props, 'page.__metadata.modelName');
        //console.log(this.props);
        const PageLayout = pageLayouts[componentName];
        
        

        


        //return <Error statusCode={404} />
        console.log('Returning page layout');
        return <PageLayout {...this.props}/>;
}