import { withIronSessionSsr } from 'iron-session/next'
import dynamic from 'next/dynamic'
import { cookie } from '~/utils'

const HOME = dynamic(
  import('../container/Home'), {
    ssr: false
  }
)
export default function HomeView({ isMobile, user }) {
  return user ? (
    <div>Logged</div>
  ) :<HOME isMobile={isMobile} />
}


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps ({ req }) {
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const { idStore } = storeUserId || {}
    const UA = req.headers['user-agent']
    const isMobile = Boolean(UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))
    try {
      return {
        props: {
          user: user || null,
          isMobile,
          idStore: idStore || null
        }
      }
    } catch (error) {
      return {}
    }
  },
  cookie
)

HomeView.getLayout = function getLayout(page) {
  const {props} = page || {}
  const {children} = props || {}
  const {props: propsChildren} = children || {}
  const {idStore} = propsChildren || {}
  return idStore ? (
    <div>
      {page}
    </div>
  ) : (
    <di>
      {page}
    </di>
  )
}
