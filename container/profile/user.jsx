import { useMutation, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { useFormTools } from '../../components/BaseForm'
import { Loading } from '../../components/Loading'
import UserProfileSettings from '../../components/UserProfile'
import { GET_USER } from '../../gql/LoginAut'
import { filterKeyObject } from '../../utils'
import {
  GET_ALL_DEVICES,
  GET_USER_PROFILE,
  SET_USER_PROFILE
} from './queries'

export const UserProfile = () => {
  const [handleChange, handleSubmit, handleForcedData, { dataForm }] = useFormTools()
  const { data, loading } = useQuery(GET_USER)
  const { data: dataDevice } = useQuery(GET_ALL_DEVICES)
  const { data: dataUp } = useQuery(GET_USER_PROFILE)
  const { getOneUserProfile } = dataUp || {}
  const [setUserProfile] = useMutation(SET_USER_PROFILE)
  useEffect(() => {
    let obj = { ...getOneUserProfile, ...data?.getUser }
    handleForcedData({ ...obj })
  }, [data, dataUp, getOneUserProfile, handleForcedData])
  const handleForm = e => {
    return handleSubmit({
      event: e,
      action: () => {
        return setUserProfile({
          variables: {
            data: {
              ...filterKeyObject(dataForm, ['__typename', 'id', 'name', 'lastName', 'email', 'getUser', 'username', 'ULocation', 'avatar', 'createAt', 'description', 'password', 'role', 'siteWeb', 'uPhoNum', 'uState', 'uToken', 'upIdeDoc', 'upLat', 'upLon']),
              upImage: 'lol',
              user: {
                id: dataForm.id,
                username: dataForm.username,
                lastName: dataForm.lastName,
                name: dataForm.name,
                uAvatar: dataForm.uAvatar,
                email: dataForm.email
              }
            }
          }
        })
      }
    })
  }
  return (
    <>
      {loading && <Loading />}
      <UserProfileSettings
        dataDevice={dataDevice?.getDeviceUsers}
        dataForm={dataForm}
        handleSubmit={handleForm}
        onChange={handleChange}
      />
    </>
  )
}