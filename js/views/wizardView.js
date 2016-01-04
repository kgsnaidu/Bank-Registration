define([
  "jquery",
  "underscore",
  "backbone",
  "bootstrap",
  "wizard",
  "validator",
  "formValidation",
  "bootstrapForm",
  "firebase",
  "successPage",
  "faildPage",
  "./text!templates/registrationWizard.html"
],function($,_,Backbone,bootstrap,wizard,validator,formValidation,bootstrapForm,firebase,successPage,faildPage,WizardTemplate){
  "use strict"
  var Wizard = Backbone.View.extend({
    template: _.template(WizardTemplate),

    dataBase : new Firebase('https://bankregistration.firebaseio.com'),
    // model : model,
    initialize: function(){
    },
    validateTab : function (index) {
        var fv   = $('#registrationForm').data('formValidation'), // FormValidation instance
            // The current tab
            $tab = $('#registrationForm').find('.tab-pane').eq(index);
            fv.validateContainer($tab);

        var isValidStep = fv.isValidContainer($tab);
        if (isValidStep === false || isValidStep === null) {
            return false;
        }

        return true;
    },
    render:function(){
      this.$el.html(this.template);
      var that = this;
      $('#registrationForm').formValidation({
        framework:'bootstrap',
        icon: {
          valid : 'fa fa-check',
          invalid : 'fa fa-times',
          validating : 'fa fa-refresh'
        },
        fields: {

          firstName : {
            validators: {
              notEmpty:{
                message : "First name is Required"
              },
              stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The first name must be more than 3 and less than 30 characters long'
              },
              regexp: {
                        regexp: /^[a-zA-Z][a-zA-Z ]*$/,
                        message: 'The first name can only consist of alphabeticals'
              }
            }
          },

          lastName : {
            validators: {
              notEmpty:{
                message : "Last name is Required"
              },
              stringLength: {
                        min: 3,
                        max: 30,
                        message: 'The last name must be more than 3 and less than 30 characters long'
              },
              regexp: {
                        regexp: /^[a-zA-Z][a-zA-Z ]*$/,
                        message: 'The last name can only consist of alphabeticals'
              }
            }
          },

          age : {
            validators: {
              notEmpty:{
                message : "Age is Required"
              },
              numeric: {
                message: "Age should be numeric"
              },
              callback: {
                message: "Invalid age",
                callback: function(value, validator){
                  if(value>0 && value<150)
                  {
                    return true;
                  }
                  else {
                    return false;
                  }
                }
              }
            }
          },

          city : {
            icon: false,
            validators: {
              notEmpty:{
                message : "City is Required"
              }
            }
          },

          profession : {
            icon: false,
            validators: {
              notEmpty:{
                message : "Profession is Required"
              }
            }
          },

          mobileNumber : {
                validators: {
                    notEmpty: {
                        message: 'Phone number is required'
                    },
                    phone: {
                        country: 'IN',
                        message: 'The phone number is not valid'
                    }
                }
            },

          panCard : {
            validators: {
                notEmpty: {
                    message: 'PAN Card is required'
                },
                stringLength: {
                          min: 10,
                          max: 10,
                          message: 'PAN Card is 10 characters long'
                }
            }
          },

          grossAnnualIncome : {
            validators: {
              notEmpty:{
                message : "Gross annual income required"
              },
              numeric: {
                message: "Gross annual income should be numeric"
              },
              callback: {
                message: "Invalid Gross annual income",
                callback: function(value, validator){
                  if(value>0)
                  {
                    return true;
                  }
                  else {
                    return false;
                  }
                }
              }
            }
          },

          companyName : {
            validators: {
                notEmpty: {
                    message: 'Company name required'
                }
            }

          },

          designation : {
            icon: false,
            validators: {
              notEmpty:{
                message : "select designation"
              }
            }

          },

          address : {
            validators: {
              notEmpty:{
                message : "address required"
              },
              stringLength: {
                        min: 10,
                        message: 'Address must be more than 10 characters long'
              },
            }

          },

          pin : {
            validators: {
                notEmpty: {
                    message: 'PIN is required'
                },
                regexp: {
                  regexp: /^[0-9]{6}$/,
                  message: 'Invalid PIN'
                }
            }
          },

          accountType : {

            icon: false,
            validators: {
              notEmpty:{
                message : "Select account type"
              }
            }

          },

          fixedDeposit : {
            icon: false,
            validators: {
              notEmpty:{
                message : "Please choose yes or no"
              }
            }
          },

          holidingCreditCard : {
            icon: false,
            validators: {
              notEmpty:{
                message : "Please choose yes or no"
              }
            }
          },

          agreeTC : {
            icon: false,
            validators: {
              notEmpty:{
                message : "Please agree to the Terms & Conditions"
              },
              callback:{
                message : "Please agree to the Terms & Conditions",
                callback: function(value, validator){
                  value = $("input[name='agreeTC']:checked").val();
                  if(value=="yes")
                  {
                    return true;
                  }
                  else {
                    return false;
                  }
                }
              }
            }
          }




        }
      }).bootstrapWizard({
        tabClass: 'nav nav-pills',
        onTabClick: function(tab, navigation, index){
          return false;
        },

        onNext: function(tab, navigation, index){
          var noOfTabs = $('#registrationForm').find('.tab-pane').length,
          isValidTab = that.validateTab(index-1);
          if(!isValidTab){
            return false;
          }
          else {
            //finding current tab fields
            var inputFields = $("#registrationForm").find("#tab"+index).find("input"),
            selectFields = $("#registrationForm").find("#tab"+index).find("select"),
            textareas = $("#registrationForm").find("#tab"+index).find("textarea");
            that.setValues(inputFields);
            that.setValues(selectFields);
            that.setValues(textareas);

          }
          if(index == noOfTabs)
          {
            that.writeToDatabase();
          }
          return true;
        },

        onPrevious: function(tab, navigation, index){
          return that.validateTab(index);
        },

        onTabShow: function(tab, navigation, index){
          var noOfTabs = $('#registrationForm').find('.tab-pane').length;
          $('#registrationForm').find('.next').removeClass('disabled').find('a')
                        .html(index === noOfTabs - 1 ? 'Apply' : 'Next');

        }
      });
    },

    setValues : function(inputs){
      var that = this;
      if(inputs.length>0)
      {
        inputs.each(function(){
          var fieldName = $(this).attr('name'),
          fieldValue = $(this).val().toUpperCase(),
          map = {};
          if(fieldName=='holidingCreditCard' || fieldName=='fixedDeposit')
          {
            fieldValue = $("input[name='"+fieldName+"']:checked").val().toUpperCase();
          }
          if(fieldName!='agreeTC')
          {
            map[fieldName] = fieldValue;
            that.model.set(map);
          }
        });
      }

    },

    resetValues : function(inputs){
      var that = this;
      if(inputs.length>0)
      {
        inputs.each(function(){
          $(this).val("");
          $("#registrationForm").formValidation('revalidateField', $(this).attr('name'));
        });
      }

    },

    writeToDatabase : function(){
      var name = this.model.get("firstName")+" "+this.model.get("lastName"),flag;

      this.dataBase.push(this.model.toJSON(), function(error){
        if(error)
        {
          var fail = new faildPage({el : '#content'});
          fail.render(name);
        }
        else {
          var success = new successPage({el : '#content'});
          success.render(name);
          flag = true;
        }
      });
    }



  });
  return Wizard;
});
