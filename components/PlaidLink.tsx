import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { useRouter } from 'next/navigation'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import Image from 'next/image'

const PlaidLink = ({user, variant}: PlaidLinkProps) => {


    const router = useRouter()
    const [token, setToken] = useState('')

    useEffect(()=>{

        const getLinkToken =  async () =>{

            const data = await createLinkToken(user);

            setToken(data?.linkToken)


        }

       getLinkToken();
    },[user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string)=>{
        
        await exchangePublicToken({
            publicToken: public_token,
            user
        })

        router.push('/')

    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const {open, ready} = usePlaidLink(config);
  return (
    <>
   {
    variant === 'primary' ?
    (
       <Button className='plaidlink-primary' onClick={() => open()} disabled={!ready}>
        Link Bank
       </Button>
    ) : variant === 'ghost' ?
  (  
    <Button variant={"ghost"} className='plaidlink-ghost' onClick={() => open()}>
        <Image
            src={"/icons/connect-bank"}
            width={24}
            height={24}
            alt='connect-bank' />
        <p className='hidden xl:block text-[16px] font-semibold text-black-2'>
            Connect Bank
        </p>
    </Button>
  ) : (
    <Button className='plaidlink-default' onClick={() => open()}>
        <Image
            src={"/icons/connect-bank.svg"}
            width={24}
            height={24}
            alt='connect-bank' />
        <p className='text-[16px] font-semibold text-black-2'>
            Connect Bank
        </p>
    </Button>
  )
}

    </>
  )
}

export default PlaidLink