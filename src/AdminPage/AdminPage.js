import React from 'react';

import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { authenticationService } from '../services/authentication.service';

export class AdminPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          kundeNavn: '',
          kontaktPerson: '',
          email: '',
          fakturaAdresse: '',
          arbejdsAdresse: '',
          arbejde: '',
          materialer: [''],
          dato: '',
          ordreNr: '',
          kontaktTlf: '',
          telefon: '',
          antal: [''],
          pris: ['']
        };
      }
    
      render(){
          return(
            
            <div>
              <div>
                <h1 className="signupheader">Arbejds seddel</h1>
                <Formik
                initialValues={{
                    kundeNavn: '',
                    kontaktPerson: '',
                    email: '',
                    fakturaAdresse: '',
                    arbejdsAdresse: '',
                    arbejde: '',
                    materialer: [''],
                    dato: '',
                    ordreNr: '',
                    kontaktTlf: '',
                    telefon: '',
                    antal: [''],
                    pris: ['']
              }}
              validationSchema={Yup.object().shape({
                kundeNavn: Yup.string().required('kundenavn skal udfyldes'),
                kontaktPerson: Yup.string().required('Kontakt person skal udfyldes'),
                arbejde: Yup.string().required('arbejde skal udfyldes'),
                fakturaAdresse: Yup.string().required('Faktura adresse skal udfyldes'),
                dato: Yup.string().required('Dato skal udfyldes'),
                telefon: Yup.string().required('Telefon skal udfyldes')

              })}
              onSubmit={({ kundeNavn, kontaktPerson, email, fakturaAdresse, arbejdsAdresse, arbejde, materialer, dato, ordreNr, kontaktTlf, telefon, antal, pris }, { setStatus, setSubmitting }) => {
                  setStatus();
                  authenticationService.seddel( kundeNavn, kontaktPerson, email, fakturaAdresse, arbejdsAdresse, arbejde, materialer, dato, ordreNr, kontaktTlf, telefon, antal, pris )
                      .then(
                          arbejdsseddel => {
                              const { from } = this.props.location.state || { from: { pathname: "/" } };
                              this.props.history.push(from);
                          },
                          error => {
                              setSubmitting(false);
                              setStatus(error);
                          }
                      );
              }}
              render={({ materialeliste, pris, antal, errors, status, touched, isSubmitting }) => (
                <Form>
                  <FieldArray
                  render={arrayHelpers => (
                    <div>
                  <div className="form-group">
                    <label htmlFor="kundeNavn">
                        Kunde navn<span className="req">*</span>
                      </label>
                      <Field name="kundeNavn" type="text" className={'form-control' + (errors.kundeNavn && touched.kundeNavn ? ' is-invalid' : '')} />
                      <ErrorMessage name="kundeNavn" component="div" className="invalid-feedback" />
                        
                    </div>
  
                    <div className="form-group">
                    <label htmlFor="kontaktPerson">
                        Kontakt person<span className="req">*</span>
                      </label>
                      <Field name="kontaktPerson" type="text" className={'form-control' + (errors.kontaktPerson && touched.kontaktPerson ? ' is-invalid' : '')} />
                      <ErrorMessage name="kontaktPerson" component="div" className="invalid-feedback" />
                    
                    </div>
                  
  
                  <div className="form-group">
                    <label htmlFor="email">
                        E-mail
                      </label>
                      <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      
                  </div>
  
                  <div className="form-group">
                  <label htmlFor="fakturaAdresse">Fakturerings adresse<span className="req">*</span></label>
                    <Field name="fakturaAdresse" type="fakturaAdresse" className={'form-control' + (errors.fakturaAdresse && touched.fakturaAdresse ? ' is-invalid' : '')} />
                    <ErrorMessage name="fakturaAdresse" component="div" className="invalid-feedback" />
                      
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="arbejdsAdresse">
                        Arbejds adresse
                      </label>
                      <Field name="arbejdsAdresse" type="text" className={'form-control' + (errors.arbejdsAdresse && touched.arbejdsAdresse ? ' is-invalid' : '')} />
                      <ErrorMessage name="arbejdsAdresse" component="div" className="invalid-feedback" />
                      
                  </div>
  
                  <div className="form-group">
                      <label htmlFor="arbejde">
                        Arbejde<span className="req">*</span>
                      </label>
                      <Field name="arbejde" type="text" className={'form-control' + (errors.arbejde && touched.arbejde ? ' is-invalid' : '')} />
                      <ErrorMessage name="arbejde" component="div" className="invalid-feedback" />
                      
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="dato">
                        Dato<span className="req">*</span>
                      </label>
                      <Field name="dato" type="text" className={'form-control' + (errors.dato && touched.dato ? ' is-invalid' : '')} />
                      <ErrorMessage name="dato" component="div" className="invalid-feedback" />
                  </div>
  
                  <div className="form-group">
                    <label htmlFor="ordreNr">
                        OrdreNr
                      </label>
                      <Field name="ordreNr" type="text" className={'form-control' + (errors.ordreNr && touched.ordreNr ? ' is-invalid' : '')} />
                      <ErrorMessage name="ordreNr" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="kontaktTlf">
                      Kontakt Telefon
                      </label>
                      <Field name="kontaktTlf" type="text" className={'form-control' + (errors.kontaktTlf && touched.kontaktTlf ? ' is-invalid' : '')} />
                      <ErrorMessage name="kontaktTlf" component="div" className="invalid-feedback" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefon">
                        Telefon<span className="req">*</span>
                      </label>
                      <Field name="telefon" type="text" className={'form-control' + (errors.telefon && touched.telefon ? ' is-invalid' : '')} />
                      <ErrorMessage name="telefon" component="div" className="invalid-feedback" />
                  </div>
                  {touched.materialer && touched.materialer.length && touched.pris && touched.pris.length && touched.antal && touched.antal.length > 0 ? (
                    touched.materialer.map((materialer, index) =>(
                    <div key={index}>
                      <div className="form-group">
                        <label htmlFor="materialer">
                            Materialeliste
                          </label>
                          <Field name={`materialer.${index}`} type="text" className={'form-control' + (errors.materialer && touched.materialer ? ' is-invalid' : '')} />
                          <ErrorMessage name="materialer" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="antal">
                            Antal
                          </label>
                          <Field name={`antal.${index}`} type="text" className={'form-control' + (errors.antal && touched.antal ? ' is-invalid' : '')} />
                          <ErrorMessage name="antal" component="div" className="invalid-feedback" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="pris">
                            Pris
                          </label>
                          <Field name={`pris.${index}`} type="text" className={'form-control' + (errors.pris && touched.pris ? ' is-invalid' : '')} />
                          <ErrorMessage name="pris" component="div" className="invalid-feedback" />
                      </div>
                    
                    <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)} value="-" // remove a friend from the list
                  />
                  
                  <button
                    type="button"
                    onClick={() => arrayHelpers.insert(index, "")} value="+" // insert an empty string at a position
                  /></div>
                    ))
                    ) : (
                      <button type="button" onClick={() => arrayHelpers.push("")}>
                        {/* show this when user has removed all friends from the list */}
                        tilføj materialer
                      </button>
                    )}
                  <div className="form-group">
                                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Create</button>
                                  {isSubmitting &&
                                      <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                  }
                              </div>
                              {status &&
                                  <div className={'alert alert-danger'}>{status}</div>
                              }
                              </div>
                             )}
                             />
                </Form>
                )}
                />
              </div>
  
           
          </div>
          );
      }
}

//export default AdminPage;