/* eslint-disable no-unused-expressions */
import {
  gql,
  useApolloClient,
  useSubscription
} from '@apollo/client'
import { Context } from 'context/Context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMobile, useStore } from 'npm-pkg-hook'
import PropTypes from 'prop-types'
import {
  useCallback,
  useContext,
  useState
} from 'react'
import { Overline } from '~/components/common/Reusable'
import { BGColor, PColor } from '../../../public/colors'
import {
  IconHome,
  IconHorario,
  IconLogo,
  IconLogout,
  IconShopping,
  IconUser,
  IconWallet
} from '../../../public/icons'
import ActiveLink from '../../common/Link'
import { ButtonOption } from '../styled'
import {
  Anchor,
  AnchorRouter,
  ButtonGlobalCreate,
  Card,
  ContainerAside,
  ContentAction,
  DynamicNav,
  Info,
  LeftNav,
  OptionButton,
  Router
} from './styled'

const Aside = () => {
  const { isMobile } = useMobile()
  const { client } = useApolloClient()
  const location = useRouter()
  const pathname = location.pathname === '/dashboard/[...name]'
  const {
    openSchedule,
    setOpenSchedule,
    countPedido,
    setCollapsed,
    collapsed
  } = useContext(Context)

  const [show, setShow] = useState(false)
  const onClickLogout = useCallback(async () => {
    await window
      .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
          // window.localStorage.clear()
          location.replace('/')
        }
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log({
          message: 'Se ha producido un error.',
          duration: 30000,
          color: 'error'
        })
      })

  }, [client, location])
  const [dataStore, { loading }] = useStore()
  const {
    storeName,
    idStore,
    uState
  } = dataStore || {}
  const GET_STATE_ORDER = gql`
    subscription {
      numberIncremented
    }
`
  const { data: dataWS } = useSubscription(GET_STATE_ORDER, {
    // context: { clientName: "admin-server" },
    onSubscriptionData: () => {
      // console.log(subscriptionData.data.numberIncremented)
    }
  })

  return (
    <>
      {isMobile &&
      <Overline
        bgColor='rgba(0,0,0,.4)'
        onClick={() => {return setCollapsed(!collapsed)}}
        show={collapsed}
        zIndex='999'
      />}
      <ContainerAside collapsed={isMobile ? collapsed : false}>
        <Card>
          <Info>
            <ButtonGlobalCreate onClick={() => { return setShow(!show) }}>
              Agregar Nuevo
            </ButtonGlobalCreate>
            <LeftNav show={show}>
              <Info>
                <h2>Customers</h2>
                <ActiveLink activeClassName='active' href='/sales-invoices'>
                  <Anchor>Invoices</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/sales-invoices'>
                  <Anchor>Sales Invoice</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Supplier</h2>
                <ActiveLink activeClassName='active' href='/bills'>
                  <Anchor>Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/pay-bills'>
                  <Anchor>Pay Bills</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/'>
                  <Anchor>Purchase Orders</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/'>
                  <Anchor>Expenses</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Employees</h2>
                <ActiveLink activeClassName='active' href='/companies/dashboard'>
                  <Anchor>Admin</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/'>
                  <Anchor>Home</Anchor>
                </ActiveLink>
              </Info>
              <Info>
                <h2>Productos</h2>
                <ActiveLink activeClassName='active' href='/proveedores/products'>
                  <Anchor>Productos</Anchor>
                </ActiveLink>
                <ActiveLink activeClassName='active' href='/dashboard'>
                  <Anchor>Panel Restaurante</Anchor>
                </ActiveLink>
              </Info>
            </LeftNav>
            {(loading) ? null : (!pathname && <Link href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
              <a>
                <h1 className='title_store'>{storeName}</h1>
                {dataWS?.numberIncremented}

              </a>
            </Link>)}
            {pathname &&
                <h1 className='title_store'>{storeName}</h1>
            }
            {uState == 1 &&
            <div className='program_state'>
              <IconLogo color={PColor} size='20px' />
              <h3 className='sub_title_store'>En pausa programada</h3>
            </div>
            }
          </Info>
          <Router>
            <ActiveLink activeClassName='active' href='/dashboard'>
              <AnchorRouter><IconHome size='15px' />Home</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/pedidos'>
              <AnchorRouter>
                <div className='count_pedidos'>{countPedido}</div>
                <IconShopping size='15px' />Pedidos
              </AnchorRouter>
            </ActiveLink>
            <DynamicNav>
              <ActiveLink activeClassName='active' href='/horarios'>
                <AnchorRouter><IconHorario size='15px' />Horarios</AnchorRouter>
              </ActiveLink>
              <ContentAction onClick={() => { return setOpenSchedule(!openSchedule) }}>
                <IconHorario color={BGColor} size='15px' />
              </ContentAction>
            </DynamicNav>
            <ActiveLink activeClassName='active' href='/ventas'>
              <AnchorRouter><IconShopping size='15px' />Ventas</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/compras'>
              <AnchorRouter><IconShopping size='15px' />Compras</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/contactos'>
              <AnchorRouter><IconShopping size='15px' />Contactos</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/formas-de-pago'>
              <AnchorRouter><IconShopping size='15px' />Formas de pago</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/informes'>
              <AnchorRouter><IconShopping size='15px' />Informes</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/'>
              <AnchorRouter><IconShopping size='15px' />Recomendaciones</AnchorRouter>
            </ActiveLink>

            <ActiveLink activeClassName='active' href='/clientes'>
              <AnchorRouter>  <IconUser size='20px' />Clientes</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/billetera'>
              <AnchorRouter>  <IconWallet size='20px' />Billetera</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/categorias'>
              <AnchorRouter>  <IconWallet size='20px' />Categor??as</AnchorRouter>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/employee'>
              <AnchorRouter>  <IconWallet size='20px' />Empleados</AnchorRouter>
            </ActiveLink>
            <OptionButton>
              <ButtonOption onClick={onClickLogout} space>
                <IconLogout color={PColor} size='20px' />
              </ButtonOption>
            </OptionButton>
            {/* {data?.map((m, i) => {
              return (
                <Options
                  active={menu === i}
                  handleClick={() => { return handleClick(i) }}
                  index={i}
                  key={m.mId}
                  label={m.mName}
                  path={m.mPath}
                // icon={<FontAwesomeIcon icon={iconModules[x.mIcon]} color={active === i ? '#a6b0cf' : '#a6b0cf'} size='lg' />}
                >
                  {!!m.subModules && m.subModules.map(sm => {
                    return <ActiveLink
                      href={`/${m.mPath}/${sm.smPath}`}
                      key={sm.smId}
                      onClick={e => { return e.stopPropagation() }}
                    >
                      <AnchorRouter><IconShopping size='15px' />{sm.smName}</AnchorRouter>
                    </ActiveLink>
                  })}
                </Options>

              )
            })} */}
          </Router>
        </Card>
      </ContainerAside>
    </>
  )
}
export default Aside

Aside.propTypes = {
  handleClickMenu: PropTypes.func,
  closeSession: PropTypes.func,
  filter: PropTypes.func,
  dataForm: PropTypes.object,
  currentUser: PropTypes.object,
  onChange: PropTypes.func,
  allCompany: PropTypes.array,
  dataCompany: PropTypes.object,
  active: PropTypes.bool,
  handleMenu: PropTypes.func
}
