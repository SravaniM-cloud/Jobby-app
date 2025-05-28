import './index.css'

// company_logo_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png'
// employment_type: 'Internship'
// id: 'bb95e51b-b1b2-4d97-bee4-1d5ec2b96751'
// job_description: 'We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev partners to minimize/avoid any production outages. The role will focus on production support.'
// location: 'Delhi'
// package_per_annum: '10 LPA'
// rating: 4
// title: 'Devops Engineer'
const JobItem = props => {
  const {jobDetails} = props

  return (
    <li>
      <img src={jobDetails.company_logo_url} alt="" />
    </li>
  )
}

export default JobItem
