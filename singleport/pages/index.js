import Head from 'next/head';
import Link from "next/link";
import styles from '../styles/Home.module.css';
import client from "../apolloClient";
import { getProducts, getCarts, createCart, searchProduct } from '../apolloClient/gqlQuery';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';


export default function Home({ products }) {
  const router = useRouter();
  const [carts, setCarts] = useState([]);

  const addToCart = async (curr) => {
    try {
      await client.mutate({
        mutation: { ...createCart },
        variables: {
          data: [
            {
              product: { connect: { id: curr.id } },
              sum: 1, quantity: 1,
              createdAt: new Date(Date.now()).toISOString()
            }
          ]
        }
      });

      toast.notify(`Product added to cart`, {
        duration: 5,
        type: "success"
      })

      await AllCarts();
    } catch (err) {
      toast.notify(`unable to add Product to cart`, {
        duration: 5,
        type: "error"
      })
    } finally {
      setTimeout(() => {
        router.reload(window.location.pathname)
      }, 5000);
      
    }
  };
  const Saerch= ()=>{
    
    const {  data } = useQuery(searchProduct, {
      variables: "top2" ,
    });
    console.log('search'+data)

}

  const searchClient= async()=>{
    try{
      const { data } = await client.query({
        query: Saerch,
      });
      console.log(data)
    }
    catch(e){
   console.log(e)
    }
  }
//   searchClient()


 

  const AllCarts = async () => {
    try {
      const { data } = await client.query({
        query: getCarts,
      });

      setCarts(data.carts);
      console.log('paths', data.carts);
    } catch (err) {
      toast.notify(`unable to fetch products in cart`, {
        duration: 5,
        type: "error"
      })
    }
  };
  
  useEffect(() => {
    AllCarts();
   
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Ecommerce App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer/>

      <main className={styles.main}>
   
        <Link href="/cart" className='cursor-pointer'>
          <h2 className='cursor-pointer'>
            Cart ({carts.length})
          </h2>
        </Link>

        <h1 className={`${styles.title} py-5`}>
          <a className='block py-10'>ECommerce Site</a>
          <span className='block pb-2'>built with keystone JS</span>
        </h1>



        <h5 className={`${styles.title} py-16`}>
          <a className='block pb-2'>Products</a>
        </h5>
        <div className={`flex`}>
        <input/>
        <button>search with name</button>
        </div>

        <div className={styles.grid}>
          {
            products && products.map((curr,i) => {
              return (
                <>
                  <div key={i}>
                    <div className={styles.card}>
                      <Link href={`/${curr.id}`} className="cursor-pointer">
                        <h2 className="flex items-center justify-between">
                          <span>{curr?.name}</span>
                          <span>&rarr;</span>
                        </h2>
                      </Link>

                      <p className='py-4 text-center'>
                        {curr?.description}
                      </p>

                      <p className='py-4 text-center'>
                        # { curr?.price }
                      </p>

                      <button onClick={() => addToCart({ ...curr, __typename: undefined })} className={styles.card}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' Next JS'}
        </a>
      </footer>
    </div>
  );
}



export async function getStaticProps() {
  const { data } = await client.query({
    query: getProducts,
  });

  return { props: { products: data.products } };
}