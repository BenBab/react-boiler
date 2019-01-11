import React from 'react';
import Input from '../../../../components/UI/Input'
import Accordian from '../../../../components/UI/Accordian';
import Minimizer from '../../../../components/UI/Wrappers/Minimizer'
import Flex from '../../../../components/UI/Wrappers/Flex'

const ContactUsSettings = (props) => {
    if (!props.plugin)return <div></div>;

    const { contactUsActive, contactUsPages } = props.plugin
    console.log('contact us settings props', props )
    return (
        <div >
            <Flex>
            <Input inputtype="checkbox" sideLabel="Contact Us Plugin" parentObj={props.parentObj} name='contactUsActive'  checked={contactUsActive} handleChange={props.handleCheckbox}/>
            <Input inputtype="select" label='Select the pages where this plugin is available' name='contactUsPages' value={contactUsPages} items={props.availableRoutes} onSelectChange={props.handleChange}/>
            </Flex>
            {contactUsActive &&
                // <Accordian name={props.name} title={'Plugin Options'} onClick={(e) => props.accordianClick(e)} >
                //     <div >
                //         hello
                //     </div>
                // </Accordian>
                <Minimizer>
                    <div>
                        hello
                    </div>
                </Minimizer>

            }
        </div>
    );
};

export default ContactUsSettings;