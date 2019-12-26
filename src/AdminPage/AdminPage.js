import React from 'react';
import DatePicker from "react-datepicker";
import * as Yup from 'yup';
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";

export class AdminPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          initialValues: {
            kundeNavn: '', //
            kontaktPerson: '', //
            fakturaAdresse: '', //
            fby: '', //
            fpost: '', //
            arbejde: '', //
            dato: new Date(), //
            telefon: '', //
            sendeEmail: '',//
            arbejdsAdresse: '',
            aby: '',
            apost:'',
            ordreNr: '',
            kontaktTlf: '',
            email: '',
            matrialeliste: [{
              matrialer: '',
              antal: '',
              pris: ''
            }]
          }
        };
      }

      handleChange = date => {
        this.setState({
          startDate: date
        });
      };
    
      render(){
        let {initialValues} = this.state;
          return(
            <div>
              <h1 className="signupheader">Arbejds seddel</h1>
            <div>
              <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    sendeEmail: Yup.string().email('dette er ikke en E-mail').required('E-mail er nødvendig for at kunne sende arbejdssedlen'),
                    kundeNavn: Yup.string().min(2, 'der skal flere bogstaver på').required('Kundenavn skal udfyldes'),
                    kontaktPerson: Yup.string().min(2, 'der skal flere bogstaver på').required('Kontaktperson mangler'),
                    fakturaAdresse: Yup.string().min(2, 'der skal flere bogstaver på').required('Faktura adresse er nødvendig'),
                    fpost: Yup.string().min(3, 'der skal flere tal på').max(6, 'der er for mange tal').required('postnr mangler'),
                    fby: Yup.string().min(2, 'der skal flere bogstaver på').required('Du skal skrive byen'),
                    dato: Yup.string().min(3, 'der skal flere tal på').required('husk at udfylde dato'),
                    telefon: Yup.string().min(6, 'der skal flere tal på').max(12, 'der er for mange tal').required('Phone is required')
                })}
                  onSubmit={(values, { setStatus, setSubmitting }) => {
                    setStatus();
                    fetch('https://nameless-ocean-57332.herokuapp.com/arbejdsseddel', {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(values)
                    })
                    .then((response) => (response.json()))
                    .catch(error => console.log(error))
                    /*.then(
                      user => {
                          const { from } = this.props.location.state || { from: { pathname: "/" } };
                          this.props.history.push(from);
                      },
                      error => {
                          setSubmitting(false);
                          setStatus(error);
                      }
                  )*/;
                  }}
                
              
                >
                {({ values, errors, status, touched, isSubmitting, handleReset }) => {
                return(
                
                <Form>
                
                    <div>
                  <div className="form-group">
                    <label htmlFor="kundeNavn">
                        Kundenavn<span className="req">*</span>
                      </label>
                      <Field name="kundeNavn" type="text" className={'form-control' + (errors.kundeNavn && touched.kundeNavn ? ' is-invalid' : '')}/>
                      <ErrorMessage name="kundeNavn" component="div" className="invalid-feedback" />
                    </div>
  
                    <div className="form-group">
                    <label htmlFor="kontaktPerson">
                        Kontaktperson<span className="req">*</span>
                      </label>
                      <Field name="kontaktPerson" type="text" className={'form-control' + (errors.kontaktPerson && touched.kontaktPerson ? ' is-invalid' : '')}/>
                      <ErrorMessage name="kontaktPerson" component="div" className="invalid-feedback" />
                    </div>
                  
  
                  <div className="form-group">
                    <label htmlFor="email">
                        E-mail
                      </label>
                      <Field name="email" type="email" className='form-control'/>
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
  
                  <div className="form-group">
                  <label htmlFor="fakturaAdresse">Fakturerings adresse<span className="req">*</span></label>
                    <Field name="fakturaAdresse" type="text" className={'form-control' + (errors.fakturaAdresse && touched.fakturaAdresse ? ' is-invalid' : '')}/>
                    <ErrorMessage name="fakturaAdresse" component="div" className="invalid-feedback" />  
                  </div>

                  <div className="form-group">
                  <label htmlFor="fpost">Fakturerings postnr<span className="req">*</span></label>
                    <Field name="fpost" type="number" className={'form-control' + (errors.fpost && touched.fpost ? ' is-invalid' : '')}/>
                    <ErrorMessage name="fpost" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                  <label htmlFor="fby">Fakturerings by<span className="req">*</span></label>
                    <Field name="fby" type="text" className={'form-control' + (errors.fby && touched.fby ? ' is-invalid' : '')}/>
                    <ErrorMessage name="fby" component="div" className="invalid-feedback" />
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="arbejdsAdresse">
                        Arbejds adresse
                      </label>
                      <Field name="arbejdsAdresse" type="text" className='form-control'/>
                      <ErrorMessage name="arbejdsAdresse" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                  <label htmlFor="apost">Arbejds postnr</label>
                    <Field name="apost" type="number" className='form-control'/>
                    <ErrorMessage name="apost" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                  <label htmlFor="aby">Arbejds by</label>
                    <Field name="aby" type="text" className='form-control'/>
                    <ErrorMessage name="aby" component="div" className="invalid-feedback" />
                  </div>
  
                  <div className="form-group">
                      <label htmlFor="arbejde">
                        Arbejde<span className="req">*</span>
                      </label>
                      <Field as="textarea" name="arbejde" rows="4" type="textarea" className={'form-control' + (errors.arbejde && touched.arbejde ? ' is-invalid' : '')}/>
                      <ErrorMessage name="arbejde" component="div" className="invalid-feedback" />
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="dato">
                        Dato<span className="req">*</span>
                      </label>
                      <DatePicker className='form-control' 
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        dateFormat="dd-MM-yyyy"
                      />
                      
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="ordreNr">
                        OrdreNr
                      </label>
                      <Field name="ordreNr" type="text" className='form-control'/>
                      <ErrorMessage name="ordrenr" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="kontaktTlf">
                      Kontakt Telefon
                      </label>
                      <Field name="kontaktTlf" type="number" className='form-control'/>
                      <ErrorMessage name="kontaktTlf" component="div" className="invalid-feedback" />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="telefon">
                        Telefon<span className="req">*</span>
                      </label>
                      <Field name="telefon" type="number" className={'form-control' + (errors.telefon && touched.telefon ? ' is-invalid' : '')}/>
                      <ErrorMessage name="telefon" component="div" className="invalid-feedback" />
                    </div>
                          <FieldArray
                  name="matrialeliste"
                  render={({ insert, remove, push }) => (
                    <div><strong>Matrialeliste</strong>
                      {values.matrialeliste.length > 0 &&
                        values.matrialeliste.map((item, index) => (
                          <div className="row" key={index}>
                            <div className="col">
                              {" "}
                              
                            </div>
                            <div className="col">
                              <Field
                                name={`matrialeliste.${index}.matrialer`}
                                placeholder="matrialer"
                                className={'form-control' + (errors.matrialer && touched.matrialer ? ' is-invalid' : '')}
                                type="text"
                              />
                              <ErrorMessage name="matrialer" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col">
                              <Field
                                name={`matrialeliste.${index}.antal`}
                                placeholder="antal"
                                className={'form-control' + (errors.antal && touched.antal ? ' is-invalid' : '')}
                                type="number"
                              />
                              <ErrorMessage name="antal" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col">
                              <Field
                                name={`matrialeliste.${index}.pris`}
                                placeholder="pris"
                                className={'form-control' + (errors.pris && touched.pris ? ' is-invalid' : '')}
                                type="number"
                              />
                              <ErrorMessage name="pris" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => push({ matrialer: "", antal: "", pris:"" })}
                      >
                        +
                      </button>
                    </div>
                  )}
                />
                <button
                  onClick={event => {
                    event.preventDefault();
                    handleReset();
                  }}
                >
                  Reset
                </button>
                      <div className="form-group">
                                <label htmlFor="email">
                            E-mail
                          </label>
                    <Field name='sendeEmail' type="email" className={'form-control' + (errors.sendeEmail && touched.sendeEmail ? ' is-invalid' : '')}/>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Send som E-mail</button>
                                {isSubmitting &&
                                    <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                              <button type="submit" className="btn btn-primary">Print</button>
                      </div>
                </Form>
                )
                }}
                </Formik>
          </div>
          </div>
          );
      }
}

//export default AdminPage;