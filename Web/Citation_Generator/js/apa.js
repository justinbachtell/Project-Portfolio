/***** APA Citation Style *****/
const citationStyleAPA = () => {
  if (!lastName && !workTitle) {
    result.innerHTML = "";
  } else {
    // no access year entered
    if (!accessYear) {
      // no author
      if (!lastName) {
        // no publish date
        if (!publishYear) {
          // no platform title
          if (!platformTitle) {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
            // platform title included
          } else {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
          }
          // publish date included
        } else {
          // no publish month
          if (!publishMonth) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
            // no publish day
          } else if (!publishDay) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
            // full publish date included
          } else {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
          }
        }
        // author included
      } else {
        // no first name
        if (!firstName) {
          // no publish date
          if (!publishYear) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
            // publish date included
          } else {
            // no publish month
            if (!publishMonth) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // no publish day
            } else if (!publishDay) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // full publish date included
            } else {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
            }
          }
          // first name included
        } else {
          // no middle initial
          if (!middleInitial) {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
              }
            }
            // middle initial included
          } else {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
              }
            }
          }
        }
      }
      // access year enetered
    } else {
      // no author
      if (!lastName) {
        // no publish date
        if (!publishYear) {
          // no platform title
          if (!platformTitle) {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            // platform title included
          } else {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
          }
          // publish date included
        } else {
          // no publish month
          if (!publishMonth) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessMonth}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
            // no publish day
          } else if (!publishDay) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessMonth}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
            // full publish date included
          } else {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
          }
        }
        // author included
      } else {
        // no first name
        if (!firstName) {
          // no publish date
          if (!publishYear) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
            // publish date included
          } else {
            // no publish month
            if (!publishMonth) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // no publish day
            } else if (!publishDay) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // full publish date included
            } else {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
            }
          }
          // first name included
        } else {
          // no middle initial
          if (!middleInitial) {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
              }
            }
            // middle initial included
          } else {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
              }
            }
          }
        }
      }
    }
  }
};
