import React,{useState} from 'react'
import './switchTab.scss'
const SwitchTab = ({data,onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [left,setLeft]=useState(0)

  const activeTab=(tab,idx)=>{
    setLeft(idx*100)
      setSelectedTab(idx)
    onTabChange(tab,idx)
  }
  return (
    <div className='switchingTabs'>
      <div className="tabItems">
        {data.map((tab,idx)=>(
          <span key={idx} className={`tabItem ${selectedTab===idx?"active":""} `} onClick={()=>activeTab(tab,idx)}>
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{left}}/>
      </div>
    </div>
  )
}

export default SwitchTab