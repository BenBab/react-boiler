import React from 'react';
import Input from '../../../../components/UI/Input'
import Minimizer from '../../../../components/UI/Wrappers/Minimizer';
import Flex from '../../../../components/UI/Wrappers/Flex';

import MultiSelect from '../../../../components/UI/MultiSelect';

const ContactUsSettings = (props) => {
    if (!props.plugin)return <div></div>;

    const { contactUsActive, contactUsPages, contactUsEmail } = props.plugin
    console.log('contact us settings props', props )
    return (
        <div >
            <Flex>
                <Input inputtype="checkbox" sideLabel="Contact Us Plugin" parentObj={props.parentObj} name='contactUsActive'  checked={contactUsActive} handleChange={props.handleCheckbox}/>
                {contactUsActive &&
                    <MultiSelect 
                        label='Select the pages where this plugin is available' 
                        items={props.availableRoutes} 
                        name='contactUsPages' 
                        value={contactUsPages}
                        handleChange={props.handleChange}
                        margin={'0 10px 20px 15px'}
                    />
                }
            </Flex>

            {contactUsActive &&
                <Minimizer padding={'20px'}>
                    <div>
                        <Input inputtype="input" label='Enter Business email where emails are received' parentObj={props.parentObj} name='contactUsEmail' value={contactUsEmail} onChange={props.handleChange}/>
                    </div>
                </Minimizer>

            }
        </div>
    );
};

export default ContactUsSettings;