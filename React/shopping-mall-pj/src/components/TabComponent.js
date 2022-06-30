import '../App.css'

function TabComponent(props) {

  return(
    <div className={`tab-content start ${props.tabState}`}>
      {props.content}
    </div>
  )
}

export default TabComponent;
