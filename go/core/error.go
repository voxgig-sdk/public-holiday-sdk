package core

type PublicHolidayError struct {
	IsPublicHolidayError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPublicHolidayError(code string, msg string, ctx *Context) *PublicHolidayError {
	return &PublicHolidayError{
		IsPublicHolidayError: true,
		Sdk:              "PublicHoliday",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PublicHolidayError) Error() string {
	return e.Msg
}
