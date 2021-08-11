export const getStaticProps = () => {
  return {
    // Redirect unknown path to home
    redirect: {
      destination: "/",
    },
  }
}

export default function NotFound() {
  return null
}
