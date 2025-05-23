import { Button } from '@/components/ui/button'
import { useDisclosure } from '@/hooks/use-disclosure'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { type AdminData, adminSchema } from '@packages/admins/schema'
import { AdminForm } from '@/features/admins/components/admin-form'
import { useCreateAdmin } from '@/features/admins/api/create-admin'
import { applyFormErrors } from '@/lib/react-hook-form'
import { usePermissionsRoles } from '@/features/permissions/api/get-permissions-roles'

const defaultValues: AdminData = {
  name: '',
  email: '',
  changePassword: true,
  password: '',
  confirmPassword: '',
  roleId: 'NONE',
  customPermissions: [],
}

export function CreateAdmin() {
  const result = usePermissionsRoles()
  const roles = result.data?.data || []
  const { open, onOpenChange, onClose } = useDisclosure()
  const form = useForm<AdminData>({
    resolver: zodResolver(adminSchema),
    defaultValues,
  })
  const createMutation = useCreateAdmin({
    onSuccess() {
      onClose()
      form.reset({ ...defaultValues })
    },
    onValidationError(errors) {
      applyFormErrors(form.setError, errors)
    },
  })

  function onSubmit(data: AdminData) {
    createMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size='sm'>Crear administrador</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear administrador</DialogTitle>
          <DialogDescription>
            Completa el formulario a continuación para crear un nuevo
            administrador.
          </DialogDescription>
        </DialogHeader>

        <AdminForm
          roles={roles}
          onSubmit={onSubmit}
          form={form}
          type='create'
          isLoading={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
