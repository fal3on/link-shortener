import { useState, useRef, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaRegCopy } from "react-icons/fa";


import Head from 'next/head'
import styles from '../styles/Home.module.css'



export default function Home() {

  const inputRef = useRef(null)
  const [shortUrl, setShortUrl] = useState('')

  //const [dataTable, setDataTable] = useState([])
  function handleClick() {
    console.log('clicked')
    // clean input field after copy
    inputRef.current.value = ''
    // call linTable from API folder
  //   fetch('/api/linkTable', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //     }) .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       setDataTable(data)
  // }
  // )
  }


  function handleSubmit(e) {
    e.preventDefault()
    const url = inputRef.current.value.toLowerCase().replace(/\s/g, '')
   
    if ( url === '' ) return alert('Please enter an URL starting with "http", "https", "ftp" or "www."')

    const regex = /^(http|https|ftp|www\.)[^\s]+\.[^\s]{2,}$/
    if ( !url.match(regex) ) return alert('Invalid URL, your URL must start with "http", "https", "ftp" or "www."')

    // remove http:// or https:// from the beginning of the url
    url.replace(/^https?:\/\//, '')
    console.log(url)

    // API request to create a short url
    fetch('/api/short-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        setShortUrl(data.shortUrl)
      })

      inputRef.current.value = ''
  }

  function handleCopy() {
    alert('Copied to clipboard')
  }

  const hash = global.window && window.location.href
  //console.log(hash)

  return (
    <div className={styles.container}>
      <Head>
        <title>Link Shortener</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* <span>Shorten all your URLs</span> with ease and monitor their performance, <span>no account needed.</span> */}
          <span>Shorten all your URLs</span> and send them to your friends without a hassle <span>no account needed</span>
        </h1>

        <div className={styles.flex}>
          <form className={styles.card} onSubmit={handleSubmit} >
            <div className={styles.form__group}>
              <label htmlFor="url">URL</label>
              <input autoComplete="off" required className={styles.input} type="text" id="url" ref={inputRef} placeholder="https://www.example.com/brass?advertisement=agreement&baseball=adjustment
" />
            </div>
            <button type='submit'>Shorten!</button>
          </form>
          <div className={styles.shorten__box}>
          {
            shortUrl ? (
              <>
                <span>{hash}{shortUrl}</span>
                <CopyToClipboard text={`${hash}${shortUrl}`} onCopy={handleCopy}>
                  <button className={styles.button} onClick={handleClick} ><FaRegCopy /></button>
                </CopyToClipboard>
              </>
            ) : (
              <span className={styles.input}>Your link will appear here ????</span>
            )
          }
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>by &gt; <span><a href="https://github.com/fal3on" target="_blank" rel='noreferrer' >faleon.dev</a></span></p>
      </footer>
    </div>
  )
}
