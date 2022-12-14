import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { CategoriesStoreComponent } from '../../../components/Update/CategoriesStore'
import { CREATE_CAT_STORE, GET_ALL_CAT_STORE, SET_DES_CAT } from '../../../gql/catStore'

export const CategoriesStore = ({ setAlertBox }) => {
  // ------------ ESTADOS ------------
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({})
  //-----------QUERIES ------------
  const [registerCategoryStore] = useMutation(CREATE_CAT_STORE)
  const { data } = useQuery(GET_ALL_CAT_STORE)
  const [desCategoryStore] = useMutation(SET_DES_CAT)

  // ------------ HANDLES ------------
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  // Contexto de las notificaciones
  const handleRegister = async e => {
    e.preventDefault()
    const { csDescription, cName } = values
    try {
      registerCategoryStore({
        variables: {
          input: {
            cState: 1,
            cName: cName,
            csDescription: csDescription
          }
        }, update(cache) {
          cache.modify({
            fields: {
              getAllCatStore(dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_CAT_STORE, data: dataOld })
              }
            }
          })
          setAlertBox({ message: 'subido con éxito', color: 'success', duration: 7000 })
        }
      }).catch(err => {return setAlertBox({ message: `${err}`, duration: 7000 })})
    }
    catch (error) {
      setAlertBox({ message: `${error.message}`, duration: 7000 })
    }
  }
  const handleDelete = pId => {
    // const value = finalData?.getAllCatStore?.filter(x => {return (x.pId === pId)})
    const value = []
    const pState = value[0]?.pState
    registerCategoryStore({
      variables: {
        input: {
          pId,
          pState
        }
      }, update(cache) {
        cache.modify({
          fields: {
            getAllCatStore(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_CAT_STORE, data: dataOld })
            }
          }
        })
        setAlertBox({ message: `El producto ${value[0].pName} ha sido eliminado`, color: 'error', duration: 7000 })
      }
    }).catch(err => {return setAlertBox({ message: `${err}`, duration: 7000 })})
  }
  const handleToggle = (e, catStore) => {
    const { checked } = e.target
    desCategoryStore({
      variables: { catStore: catStore, cState: checked ? 0 : 1 /* aDateConf: moment().valueOf() */ }, update(cache) {
        cache.modify({
          fields: {
            getAllCatStore(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_CAT_STORE, data: dataOld })
            }
          }
        })
      }
    }).catch(() => { return })
  }
  return (
    <CategoriesStoreComponent
      data={data?.getAllCatStore || []}
      errors={errors}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleRegister={handleRegister}
      handleToggle={handleToggle}
      values={values}
    />
  )
}
CategoriesStore.propTypes = {
  handleChangeClick: PropTypes.func,
  filterState: PropTypes.object,
  handleChange: PropTypes.func
}