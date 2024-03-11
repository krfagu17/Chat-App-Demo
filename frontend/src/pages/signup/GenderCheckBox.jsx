import React from 'react'

const GenderCheckBox = ({onChangeGenderBox,selectedGender}) => {
  return (
    <div className='flex justify-evenly'>

    <div className="form-control ">
  <label className={`label cursor-pointer ${selectedGender==="Male" ? "selected" :""}`}>
    <span className="label-text">Male</span> 
    <input type="checkbox" defaultChecked className="checkbox"
    checked={selectedGender==="Male"}
    onChange={()=>onChangeGenderBox("Male")}
    />
  </label>
</div>

<label className={`label cursor-pointer ${selectedGender==="Female" ? "selected" :""}`} >
    <span className="label-text">Female</span> 
    <input type="checkbox" defaultChecked className="checkbox"
    
    checked={selectedGender==="Female"}
    onChange={()=>onChangeGenderBox("Female")}/>
  </label>
    </div>
  )
}

export default GenderCheckBox