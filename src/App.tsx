import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Col, FormGroup, Row, Form, Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'


const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<FormFields>({
    defaultValues: {
      email: 'johndoe@example.com'
    },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      throw new Error()
    } catch (error) {
      setError('root', {
        message: "This email has already taken"
      })
    }
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Row>
            <Col lg={6}>
            </Col>
          </Row>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="johndoe@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <span
                      className="text-danger d-inline-block mt-2"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </FormGroup>
                <FormGroup className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <span
                      className="text-danger d-inline-block mt-2"
                    >
                      {errors.password.message}
                    </span>
                  )}
                </FormGroup>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="success"
                >
                  {isSubmitting ? 'Loading....' : 'Submit'}
                </Button>
                {errors.root && (
                  <div>
                    <span
                      className="text-danger d-inline-block mt-2"
                    >
                      {errors.root.message}
                    </span>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default App
