import Contract from 'container/contract'
const NestedLayout = (props) => {
  return(
    <div>
      {props.children}
    </div>
  )
}

export default function Contrato() {
  return <Contract />
}
Contrato.getLayout = function getLayout(page) {
  return (
    <div>
      <NestedLayout>{page}</NestedLayout>
    </div>
  )
}
